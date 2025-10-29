import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from './article.model';
import { Language } from './language.model';

@Table({
  tableName: 'pubmed_articles_languages',
  freezeTableName: true,
  underscored: true,
  indexes: [{ fields: ['article_id'] }, { fields: ['language_id'] }],
})
export class ArticleLanguage extends Model {
  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare article_id: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare language_id: number;
}
