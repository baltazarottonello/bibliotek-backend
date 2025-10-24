import { Module } from '@nestjs/common';
import { Article } from '../database/models/article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles-controller.controller';
import { ArticlesService } from './articles.service';
import { JournalModule } from 'src/journals/journal.module';
import { CountriesModule } from 'src/countries/countries.module';
import { PubTypesModule } from 'src/pub-types/pub-types.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { AffiliationsModule } from 'src/affiliations/affiliations.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { MeshModule } from 'src/mesh/mesh.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Article]),
    CountriesModule,
    JournalModule,
    AuthorsModule,
    AffiliationsModule,
    PubTypesModule,
    LanguagesModule,
    MeshModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticleModule {}
