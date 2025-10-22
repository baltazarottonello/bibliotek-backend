import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlePubType } from 'src/database/models/article-pub-type.model';

@Module({
  imports: [SequelizeModule.forFeature([ArticlePubType])],
})
export class ArticlePubTypeModule {}
