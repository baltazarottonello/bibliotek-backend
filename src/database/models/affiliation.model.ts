import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AffiliationGroup } from './affiliation-group';

@Table({
  tableName: 'pubmed_affiliations',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }],
})
export class Affiliation extends Model {
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

  @ForeignKey(() => AffiliationGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  affiliation_group_id: number;

  @BelongsTo(() => AffiliationGroup)
  affiliationGroup: AffiliationGroup;
}
