import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/database/base/base.service';
import { Article } from 'src/database/models/article.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';
import { Country } from 'src/database/models/country.model';
import { Author } from 'src/database/models/author.model';
import { Affiliation } from 'src/database/models/affiliation.model';
import { CountriesService } from 'src/countries/countries.service';
import { JournalsService } from 'src/journals/journals.service';
import { PubTypesService } from 'src/pub-types/pub-types.service';
import { AuthorsService } from 'src/authors/authors.service';
import { AffiliationsService } from 'src/affiliations/affiliations.service';
import { LanguagesService } from 'src/languages/languages.service';
import { MeshService } from 'src/mesh/mesh.service';

@Injectable()
export class ArticlesService extends BaseService<Article> {
  constructor(
    @InjectModel(Article) articleRepo: typeof Article,
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly countriesService: CountriesService,
    private readonly journalsService: JournalsService,
    private readonly authorsService: AuthorsService,
    private readonly affiliationsService: AffiliationsService,
    private readonly pubTypesService: PubTypesService,
    private readonly languagesService: LanguagesService,
    private readonly meshService: MeshService,
  ) {
    super(articleRepo);
  }

  async create(attributes: any): Promise<Article> {
    const transaction: Transaction = await this.sequelize.transaction();
    try {
      let country: Country | null = null;
      //1. Check if the country of the journal exists
      country = await this.countriesService.findByName(
        attributes.journal.country,
        { transaction },
      );
      //2. If not, create it
      if (!country) {
        country = await this.countriesService.create(
          {
            name: attributes.journal.country,
          },
          { transaction },
        );
      }

      //3. Check if the journal exists
      let journal = await this.journalsService.findByTitle(
        attributes.journal.title,
        { transaction },
      );
      //4. If not, create it
      if (!journal) {
        journal = await this.journalsService.create(
          {
            title: attributes.journal.title,
            country_id: country?.id,
          },
          { transaction },
        );
      }

      //5. Create the article
      const articleLike = {
        pmid: attributes.pmid,
        title: attributes.title,
        year: attributes.year,
        status: attributes.status,
        journal_id: journal.id,
        doi: attributes.doi,
        month: attributes.month,
        volume: attributes.volume,
        issue: attributes.issue,
        start_page: attributes.startPage,
        end_page: attributes.endPage,
        abstract: attributes.abstract,
      } as Partial<Article>;

      const article = await super.create(articleLike, { transaction });

      //6. Check if types exist, if not create them

      const pubTypes = attributes.types;
      for (const type of pubTypes) {
        console.log(attributes.types);
        let pubType = await this.pubTypesService.findByName(type, {
          transaction,
        });
        if (!pubType) {
          pubType = await this.pubTypesService.create(
            { name: type },
            { transaction },
          );
        }
      }

      //7. Check authors exist, if not create them
      const authors = attributes.authors;
      if (authors && authors.length > 0) {
        for (const author of authors) {
          let currentAuthor: Author | null = null;
          //check if the author have an orcid and check by orcid
          if (author.orcid) {
            currentAuthor = await this.authorsService.findByOrcid(
              author.orcid,
              { transaction },
            );
          } else {
            currentAuthor = await this.authorsService.findByName(author.name, {
              transaction,
            });
          }

          if (!currentAuthor) {
            currentAuthor = await this.authorsService.create(
              {
                name: author.name,
                lastname: author.lastName,
                orcid: author.orcid ?? null,
              },
              { transaction },
            );
          }

          await article.$add('authors', currentAuthor, { transaction });

          //check affiliations
          const affiliations = author.affiliations;
          if (affiliations && affiliations.length > 0) {
            for (const affiliation of affiliations) {
              let currentAffiliation: Affiliation | null = null;
              currentAffiliation = await this.affiliationsService.findByName(
                affiliation.name,
                { transaction },
              );
              if (!currentAffiliation) {
                currentAffiliation = await this.affiliationsService.create(
                  {
                    name: affiliation.name,
                  },
                  { transaction },
                );
              }
              await currentAuthor.$add('affiliations', currentAffiliation, {
                transaction,
              });
            }
          }
        }
      }

      //8. associate languages
      const languages = attributes.languages;
      if (languages && languages.length > 0) {
        for (const language of languages) {
          let lang = await this.languagesService.findByName(language.name, {
            transaction,
          });
          if (!lang) {
            lang = await this.languagesService.create(
              { name: language.name },
              { transaction },
            );
          }
          await article.$add('languages', lang, { transaction });
        }
      }

      //9. associate mesh
      const meshHeaders = attributes.mesh;
      if (meshHeaders && meshHeaders.length > 0) {
        for (const meshTerm of meshHeaders) {
          let mesh = await this.meshService.findByName(meshTerm.name, {
            transaction,
          });
          if (!mesh) {
            mesh = await this.meshService.create(
              {
                name: meshTerm.name,
                ui: meshTerm.ui,
              },
              { transaction },
            );
          }
          await article.$add('mesh', mesh, { transaction });
        }
      }

      await transaction.commit();
      return article;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error creating article.` + (error as Error).message);
    }
  }
}
