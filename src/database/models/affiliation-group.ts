import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Affiliation } from './affiliation.model';

@Table({
  tableName: 'pubmed_affiliation_groups',
  freezeTableName: true,
  underscored: true,
})
export class AffiliationGroup extends Model {
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
  name: string;

  @HasMany(() => Affiliation)
  affiliations: Affiliation[];
}
