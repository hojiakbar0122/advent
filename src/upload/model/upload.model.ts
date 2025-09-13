// image.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'uploads' })
export class Upload extends Model<Upload> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare url: string;
}
