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
import { Mesh } from './mesh.model';

@Table({
  tableName: 'pubmed_articles_mesh',
  freezeTableName: true,
  underscored: true,
  indexes: [{ fields: ['article_id'] }, { fields: ['mesh_id'] }],
})
export class ArticleMesh extends Model {
  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  article_id: number;

  @ForeignKey(() => Mesh)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mesh_id: number;
}
