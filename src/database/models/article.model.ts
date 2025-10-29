import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  //   ForeignKey,
  //   HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Journal } from 'src/database/models/journal.model';
import { PubType } from './pub_type.model';
import { ArticlePubType } from './article-pub-type.model';
import { Author } from './author.model';
import { ArticleAuthor } from './article-author.model';
import { Mesh } from './mesh.model';
import { ArticleMesh } from './article-mesh.model';
import { Language } from './language.model';
import { ArticleLanguage } from './article-language.model';

@Table({
  tableName: 'pubmed_articles',
  freezeTableName: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['pmid'] },
    { unique: true, fields: ['doi'] },
  ],
})
export class Article extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare pmid: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare year: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @ForeignKey(() => Journal)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare journal_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare doi: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare month: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare volume: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare issue: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare start_page: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare end_page: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  declare abstract: string;

  @BelongsTo(() => Journal)
  declare journal: Journal;

  @BelongsToMany(() => PubType, { through: () => ArticlePubType })
  declare pubTypes: PubType[];

  @BelongsToMany(() => Author, { through: () => ArticleAuthor })
  declare authors: Author[];

  @BelongsToMany(() => Mesh, { through: () => ArticleMesh })
  declare mesh: Mesh[];

  @BelongsToMany(() => Language, { through: () => ArticleLanguage })
  declare languages: Language[];
}
