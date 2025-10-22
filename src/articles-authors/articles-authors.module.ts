import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleAuthor } from 'src/database/models/article-author.model';

@Module({
  imports: [SequelizeModule.forFeature([ArticleAuthor])],
})
export class ArticlesAuthorsModule {}
