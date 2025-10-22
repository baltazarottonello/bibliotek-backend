import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleLanguage } from 'src/database/models/article-language.model';

@Module({
  imports: [SequelizeModule.forFeature([ArticleLanguage])],
})
export class ArticlesLanguageModule {}
