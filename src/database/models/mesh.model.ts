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
import { ArticleMesh } from './article-mesh.model';

@Table({
  tableName: 'pubmed_mesh',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['ui'] }],
})
export class Mesh extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  //@ts-expect-error // Model already defines id
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ui: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Article, { through: () => ArticleMesh })
  articles: Article[];
}
