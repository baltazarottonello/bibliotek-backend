import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from './article.model';
import { Country } from './country.model';

@Table({
  tableName: 'pubmed_journals',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['issn', 'issn_type'] }],
})
export class Journal extends Model {
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
  title: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  country_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  abbr: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  issn: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  issn_type: string;

  @HasMany(() => Article)
  articles: Article[];

  @BelongsTo(() => Country)
  country: Country;
}
