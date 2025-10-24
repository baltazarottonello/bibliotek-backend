import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from './article.model';
import { ArticleLanguage } from './article-language.model';

@Table({
  tableName: 'pubmed_languages',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }],
})
export class Language extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Article, { through: () => ArticleLanguage })
  articles: Article[];
}
