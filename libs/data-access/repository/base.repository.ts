import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class BaseRepository {
  private _model;
  constructor(_model) {
    this._model = _model;
  }

  async create(data) {
    const createdUser = new this._model(data);
    return await createdUser.save();
  }
  async createMany(data) {
    return await this._model.insertMany(data);
  }

  async findOne(condition, projection = null) {
    if (projection) {
      return this._model.findOne(condition, projection);
    } else {
      return this._model.findOne(condition);
    }
  }

  async findById(id: string, projection = {}) {
    return this._model.findById(id, projection);
  }

  async find(condition = {}, projection = null) {
    if (projection) {
      return this._model.find(condition, projection);
    } else {
      return this._model.find(condition);
    }
  }

  async findByIdAndUpdate(id: string, value: any, upsert = false) {
    return await this._model.findByIdAndUpdate(id, value, {
      new: true,
      upsert,
    });
  }

  async updateById(id, data, options = {}) {
    return this._model.findByIdAndUpdate(id, data, options);
  }
  async updateOne(condition, data, options = {}) {
    return this._model.findOneAndUpdate(condition, data, options);
  }

  async updateMany(condition, data, options = {}) {
    return this._model.updateMany(condition, data, options);
  }

  async deleteMany(condition) {
    return await this._model.deleteMany(condition);
  }

  async deleteOne(condition) {
    return await this._model.deleteOne(condition);
  }

  async deleteById(id: string) {
    return await this._model.findByIdAndDelete(id);
  }

  async aggregate(stages: any) {
    return this._model.aggregate(stages);
  }

  async aggregatePaginate(stages, paginationOptions, sort = null) {
    let { skip, limit } = paginationOptions;
    skip = parseInt(skip);
    limit = parseInt(limit);

    if (!sort) {
      stages.push({
        $facet: {
          pagination: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      });
    } else {
      stages.push({
        $facet: {
          pagination: [{ $count: 'total' }],
          data: [
            { $skip: skip },
            { $limit: limit },
            { $sort: { [sort.orderBy]: sort.order === 'asc' ? 1 : -1 } },
          ],
        },
      });
    }
    const aggregationResult = await this._model.aggregate(stages);
    const total = aggregationResult[0].pagination[0]
      ? aggregationResult[0].pagination[0].total
      : 0;
    const hasNextPage = total - (skip + limit) > 0 ? true : false;
    return {
      data: aggregationResult[0].data,
      pagination: {
        total: total,
        hasNextPage,
      },
    };
  }
}
