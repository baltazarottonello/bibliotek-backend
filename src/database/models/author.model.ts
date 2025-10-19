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

@Table({
  tableName: 'pubmed_authors',
  freezeTableName: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['orcid'] },
    { unique: true, fields: ['name', 'lastname', 'orcid'] },
  ],
})
export class Author extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  //@ts-expect-error // Model already defines id
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  orcid: string;

  @BelongsToMany(() => Article, { through: () => ArticleAuthor })
  articles: Article[];
}
