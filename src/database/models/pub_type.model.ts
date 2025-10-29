import {
  BelongsToMany,
  Column,
  DataType,
  //   ForeignKey,
  //   HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from './article.model';
import { ArticlePubType } from './article-pub-type.model';

@Table({
  tableName: 'pubmed_pub_types',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }],
})
export class PubType extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare name: string;

  @BelongsToMany(() => Article, { through: () => ArticlePubType })
  declare articles: Article[];
}
