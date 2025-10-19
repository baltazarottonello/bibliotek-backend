import { Module } from '@nestjs/common';
import { Article } from '../database/models/article.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  //   controllers: [ArticleController],
  //   providers: [ArticleService],
})
export class ArticleModule {}
