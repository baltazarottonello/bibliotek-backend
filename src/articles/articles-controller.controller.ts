import { Body, Controller, Post } from '@nestjs/common';
import { ArticleDto } from './article.dto';

@Controller('articles')
export class ArticlesController {
  @Post()
  createArticle(@Body() articleDto: ArticleDto) {
    // Logic to create an article
  }
}
