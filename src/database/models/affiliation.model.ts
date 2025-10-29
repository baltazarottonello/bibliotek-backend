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
  indexes: [{ unique: true, fields: ['name_hash'] }], // Index on first 255 characters of name
})
export class Affiliation extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(64), // SHA-256 en hex son 64 chars
    allowNull: false,
    unique: true, // índice único real
  })
  declare name_hash: string;

  @ForeignKey(() => AffiliationGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare affiliation_group_id: number;

  @BelongsTo(() => AffiliationGroup)
  declare affiliationGroup: AffiliationGroup;

  @BelongsToMany(() => Author, { through: () => AffiliationAuthor })
  declare authors: Author[];
}
