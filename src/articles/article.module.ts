import { Module } from '@nestjs/common';
import { Article } from '../database/models/article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles-controller.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  //   providers: [ArticleService],
})
export class ArticleModule {}
