import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Journal } from './journal.model';

@Table({
  tableName: 'pubmed_countries',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }],
})
export class Country extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Journal)
  declare journals: Journal[];
}
