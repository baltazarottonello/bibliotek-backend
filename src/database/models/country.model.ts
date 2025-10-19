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

  @HasMany(() => Journal)
  journals: Journal[];
}
