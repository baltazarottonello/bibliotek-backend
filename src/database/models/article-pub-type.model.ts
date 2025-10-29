import {
  Column,
  DataType,
  ForeignKey,
  //   ForeignKey,
  //   HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PubType } from './pub_type.model';
import { Article } from './article.model';

@Table({
  tableName: 'pubmed_articles_pub_types',
  freezeTableName: true,
  underscored: true,
  indexes: [
    {
      fields: ['article_id'],
    },
    {
      fields: ['pub_type_id'],
    },
  ],
})
export class ArticlePubType extends Model {
  @ForeignKey(() => PubType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare pub_type_id: number;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare article_id: number;
}
