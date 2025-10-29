import { Model } from 'sequelize-typescript';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Affiliation } from './affiliation.model';
import { Author } from './author.model';

@Table({
  tableName: 'pubmed_affiliation_authors',
  freezeTableName: true,
  underscored: true,
})
export class AffiliationAuthor extends Model {
  @ForeignKey(() => Affiliation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare affiliation_id: number;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare author_id: number;
}
