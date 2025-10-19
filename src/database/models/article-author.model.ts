import {
  Column,
  DataType,
  ForeignKey,
  //   ForeignKey,
  //   HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from './article.model';
import { Author } from './author.model';

@Table({
  tableName: 'pubmed_articles_authors',
  freezeTableName: true,
  underscored: true,
  indexes: [
    {
      fields: ['article_id'],
    },
    {
      fields: ['author_id'],
    },
  ],
})
export class ArticleAuthor extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  //@ts-expect-error // Model already defines id
  id: number;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  article_id: number;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author_id: number;
}
