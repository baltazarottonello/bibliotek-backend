import { Body, Controller, Post } from '@nestjs/common';
import { CreateArticleDto } from './article.dto';
import { ArticlesService } from './articles.service';
import { JournalsService } from 'src/journals/journals.service';
import { CountriesService } from 'src/countries/countries.service';
import { Article } from 'src/database/models/article.model';
import { PubTypesService } from 'src/pub-types/pub-types.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly countriesService: CountriesService,
    private readonly journalsService: JournalsService,
    private readonly pubTypesService: PubTypesService,
  ) {}
  @Post()
  async createArticle(@Body() articleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = await this.articlesService.create(articleDto);
      return article;
    } catch (error) {
      throw new Error(`Error creating article.` + (error as Error).message);
    }
  }
}
