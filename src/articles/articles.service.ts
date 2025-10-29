import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/database/base/base.service';
import { Article } from 'src/database/models/article.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, Transaction } from 'sequelize';
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
import {
  AffiliationDto,
  AuthorDto,
  CreateArticleDto,
  JournalDto,
  LanguageDto,
  MeshDto,
  PubTypeDto,
} from './article.dto';

@Injectable()
export class ArticlesService extends BaseService<Article> {
  private readonly logger = new Logger(ArticlesService.name);
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

  async createChunk(articles: CreateArticleDto[]): Promise<Article[]> {
    const transaction = await this.sequelize.transaction();
    try {
      let uniqueArticles: CreateArticleDto[] = [];
      // --- CACHES ---
      const countryCache = new Map<string, Country>();
      const journalCache = new Map<string, any>();
      const pubTypeCache = new Map<string, any>();
      const authorCache = new Map<string, Author>();
      const affiliationCache = new Map<string, Affiliation>();
      const languageCache = new Map<string, any>();
      const meshCache = new Map<string, any>();

      //FILTRAR POSIBLES DOI DUPLICADOS EN EL LOTE Y EN LA DB
      uniqueArticles = await this.filterArticlesByDoi(articles);

      if (uniqueArticles.length === 0) {
        await transaction.commit();
        return [];
      }

      const articlesToInsert: Partial<Article>[] = [];

      // --- PRIMER PASO: países y journals ---
      for (const art of uniqueArticles) {
        try {
          const country: Country | null = art.journal.country
            ? await this.processCountry(
                art.journal.country,
                countryCache,
                transaction,
              )
            : null;

          // Journal
          await this.processJournal(
            art.journal,
            country,
            journalCache,
            transaction,
          );

          // Preparar artículo
          articlesToInsert.push({
            pmid: art.pmid,
            title: art.title,
            year: art.year,
            status: art.status,
            journal_id: journalCache.get(art.journal.title).id,
            doi: art.doi,
            month: art.month,
            volume: art.volume,
            issue: art.issue,
            start_page: art.start_page,
            end_page: art.end_page,
            abstract: art.abstract,
          });
        } catch (error) {
          this.logger.error(
            `Error processing article journal and country:  ${JSON.stringify(art)}` +
              (error as Error).message,
          );
          throw error;
        }
      }
      // --- SEGUNDO PASO: bulk insert artículos ---
      const createdArticles = await super.bulkCreate(articlesToInsert, {
        transaction,
        returning: true,
      });

      // --- TERCER PASO: procesar tipos, autores, afiliaciones, idiomas, mesh ---
      for (let i = 0; i < uniqueArticles.length; i++) {
        try {
          const art = uniqueArticles[i];
          const createdArticle = createdArticles[i];
          // TIPOS
          if (art.types) {
            await this.processArtTypes(
              art.types,
              createdArticle,
              pubTypeCache,
              transaction,
            );
          }

          // AUTORES + AFILIACIONES
          if (art.authors) {
            for (const author of art.authors) {
              const currentAuthor = await this.processAuthors(
                author,
                createdArticle,
                authorCache,
                transaction,
              );

              // AFILIACIONES
              if (author.affiliations) {
                await this.processAffiliations(
                  author.affiliations,
                  currentAuthor,
                  affiliationCache,
                  transaction,
                );
              }
            }
          }

          // IDIOMAS
          if (art.langs) {
            await this.processLanguages(
              art.langs,
              createdArticle,
              languageCache,
              transaction,
            );
          }

          // MESH
          if (art.mesh) {
            await this.processMeshHeadings(
              art.mesh,
              createdArticle,
              meshCache,
              transaction,
            );
          }
        } catch (error) {
          this.logger.error(
            `Error processing article associations:  ${JSON.stringify(uniqueArticles[i])}` +
              (error as Error).message,
          );
          throw error;
        }
      }
      await transaction.commit();
      return createdArticles;
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw new Error(
        'Error creating articles chunk: ' + (error as Error).message,
      );
    }
  }

  private async filterArticlesByDoi(
    articles: CreateArticleDto[],
  ): Promise<CreateArticleDto[]> {
    const seenDOIs = new Set<string>();
    let uniqueArticles = articles.filter((art) => {
      if (!art.doi) return true;
      if (seenDOIs.has(art.doi)) return false;
      seenDOIs.add(art.doi);
      return true;
    });

    const existingArticles = await this.findAll({
      where: {
        doi: { [Op.in]: uniqueArticles.map((art) => art.doi) },
      },
    });

    if (existingArticles.length > 0) {
      uniqueArticles = uniqueArticles.filter((art) =>
        existingArticles.some((ea) => ea.doi === art.doi) ? false : true,
      );
    }

    if (uniqueArticles.length === 0) {
      return [];
    }

    return uniqueArticles;
  }

  private async processCountry(
    countryName: string,
    countryCache: Map<string, Country>,
    transaction: Transaction,
  ): Promise<Country> {
    let country: Country | null = null;
    if (!countryCache.has(countryName)) {
      country = await this.countriesService.findByName(countryName, {
        transaction,
      });
      if (!country) {
        country = await this.countriesService.create(
          { name: countryName },
          { transaction },
        );
      }
      countryCache.set(countryName, country);
    } else country = countryCache.get(countryName)!;
    return country;
  }

  private async processJournal(
    journalData: JournalDto,
    country: Country | null,
    journalCache: Map<string, any>,
    transaction: Transaction,
  ): Promise<void> {
    if (!journalCache.has(journalData.title)) {
      let journal = await this.journalsService.findByTitle(journalData.title, {
        transaction,
      });
      if (!journal) {
        journal = await this.journalsService.create(
          {
            title: journalData.title,
            country_id: country ? country.id : null,
            abbr: journalData.abbr,
            issn: journalData.issn,
            issn_type: journalData.issn_type,
          },
          { transaction },
        );
      }
      journalCache.set(journalData.title, journal);
    }
  }

  private async processArtTypes(
    types: PubTypeDto[],
    createdArticle: Article,
    pubTypeCache: Map<string, any>,
    transaction: Transaction,
  ): Promise<void> {
    for (const type of types) {
      if (!pubTypeCache.has(type.name)) {
        let pubType = await this.pubTypesService.findByName(type.name, {
          transaction,
        });
        if (!pubType) {
          pubType = await this.pubTypesService.create(
            { name: type.name },
            { transaction },
          );
        }
        pubTypeCache.set(type.name, pubType);
      }
      await createdArticle.$add('pubTypes', pubTypeCache.get(type.name), {
        transaction,
      });
    }
  }

  private async processAuthors(
    author: AuthorDto,
    createdArticle: Article,
    authorCache: Map<string, Author>,
    transaction: Transaction,
  ): Promise<Author> {
    let currentAuthor: Author;
    //SI NO HAY ORCID, CREARLO DIRECTAMENTE
    if (!author.orcid) {
      currentAuthor = await this.authorsService.create(
        {
          name: author.name,
          lastname: author.lastname,
        },
        { transaction },
      );
    } else {
      if (!authorCache.has(author.orcid)) {
        //@ts-expect-error this can return null but is already handled
        currentAuthor = await this.authorsService.findByOrcid(author.orcid, {
          transaction,
        });
        if (!currentAuthor) {
          currentAuthor = await this.authorsService.create(
            {
              name: author.name,
              lastname: author.lastname,
              orcid: author.orcid,
            },
            { transaction },
          );
        }
        authorCache.set(author.orcid, currentAuthor);
      } else {
        currentAuthor = authorCache.get(author.orcid)!;
      }
    }
    await createdArticle.$add('authors', currentAuthor, {
      transaction,
    });
    return currentAuthor;
  }

  private async processAffiliations(
    affiliations: AffiliationDto[],
    currentAuthor: Author,
    affiliationCache: Map<string, Affiliation>,
    transaction: Transaction,
  ) {
    for (const affiliation of affiliations) {
      if (!affiliationCache.has(affiliation.name!)) {
        let currentAffiliation = await this.affiliationsService.findByName(
          affiliation.name!,
          { transaction },
        );
        if (!currentAffiliation) {
          currentAffiliation = await this.affiliationsService.create(
            { name: affiliation.name! },
            { transaction },
          );
        }
        affiliationCache.set(affiliation.name!, currentAffiliation);
      }
      await currentAuthor?.$add(
        'affiliations',
        affiliationCache.get(affiliation.name!)!,
        { transaction },
      );
    }
  }

  private async processLanguages(
    languages: LanguageDto[],
    createdArticle: Article,
    languageCache: Map<string, any>,
    transaction: Transaction,
  ): Promise<void> {
    for (const language of languages) {
      if (!languageCache.has(language.name!)) {
        let lang = await this.languagesService.findByName(language.name!, {
          transaction,
        });
        if (!lang) {
          lang = await this.languagesService.create(
            { name: language.name! },
            { transaction },
          );
        }
        languageCache.set(language.name!, lang);
      }
      await createdArticle.$add(
        'languages',
        languageCache.get(language.name!),
        { transaction },
      );
    }
  }

  private async processMeshHeadings(
    meshHeadings: MeshDto[],
    createdArticle: Article,
    meshCache: Map<string, any>,
    transaction: Transaction,
  ): Promise<void> {
    for (const meshTerm of meshHeadings) {
      if (!meshCache.has(meshTerm.name!)) {
        let mesh = await this.meshService.findByName(meshTerm.name!, {
          transaction,
        });
        if (!mesh) {
          mesh = await this.meshService.create(
            { name: meshTerm.name, ui: meshTerm.ui },
            { transaction },
          );
        }
        meshCache.set(meshTerm.name!, mesh);
      }
      await createdArticle.$add('mesh', meshCache.get(meshTerm.name!), {
        transaction,
      });
    }
  }
}
