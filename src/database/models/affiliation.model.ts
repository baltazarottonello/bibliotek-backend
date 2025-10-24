import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AffiliationGroup } from './affiliation-group.model';
import { Author } from './author.model';
import { AffiliationAuthor } from './affiliation-author.model';

@Table({
  tableName: 'pubmed_affiliations',
  freezeTableName: true,
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }],
})
export class Affiliation extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => AffiliationGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  affiliation_group_id: number;

  @BelongsTo(() => AffiliationGroup)
  affiliationGroup: AffiliationGroup;

  @BelongsToMany(() => Author, { through: () => AffiliationAuthor })
  authors: Author[];
}
