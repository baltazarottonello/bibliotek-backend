import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ArticleModule } from './articles/article.module';
import { JournalModule } from './journals/journal.module';
import { PubTypesModule } from './pub-types/pub-types.module';
import { ArticlePubTypeModule } from './article-pub-type/article-pub-type.module';
import { ArticleMeshModule } from './article-mesh/article-mesh.module';
import { MeshModule } from './mesh/mesh.module';
import { AuthorsModule } from './authors/authors.module';
import { ArticlesAuthorsModule } from './articles-authors/articles-authors.module';
import { AffiliationGroupModule } from './affiliation-group/affiliation-group.module';
import { AffiliationsModule } from './affiliations/affiliations.module';
import { LanguagesModule } from './languages/languages.module';
import { ArticlesLanguageModule } from './articles-language/articles-language.module';
import { CountriesModule } from './countries/countries.module';
import { AffiliationsAuthorsModule } from './affiliations-authors/affiliations-authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
    DatabaseModule,
    ArticleModule,
    CountriesModule,
    JournalModule,
    PubTypesModule,
    ArticlePubTypeModule,
    MeshModule,
    ArticleMeshModule,
    AuthorsModule,
    ArticlesAuthorsModule,
    AffiliationGroupModule,
    AffiliationsModule,
    LanguagesModule,
    ArticlesLanguageModule,
    AffiliationsAuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
