import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "admins" })
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    // unique:true
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4()
  })
  declare activation_link: string
}
