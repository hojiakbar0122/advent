import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'tours' })
export class Tour extends Model<Tour> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare img: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare days: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare link: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare country: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare region: string;
}
