import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModels } from './mongoose-models';
// Import other schemas as needed
// import { AnotherSchema } from '../schemas/another.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature(mongooseModels)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
