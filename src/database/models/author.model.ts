import {
  BelongsToMany,
  Column,
  DataType,
  //   ForeignKey,
  //   HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ArticleAuthor } from './article-author.model';
import { Article } from './article.model';
import { Affiliation } from './affiliation.model';
import { AffiliationAuthor } from './affiliation-author.model';

@Table({
  tableName: 'pubmed_authors',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['orcid'] }],
})
export class Author extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare orcid: string;

  @BelongsToMany(() => Article, { through: () => ArticleAuthor })
  declare articles: Article[];

  @BelongsToMany(() => Affiliation, { through: () => AffiliationAuthor })
  declare affiliations: Affiliation[];
}
