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
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare country_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare abbr: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare issn: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare issn_type: string;

  @HasMany(() => Article)
  declare articles: Article[];

  @BelongsTo(() => Country)
  declare country: Country;
}
