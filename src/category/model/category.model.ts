import { Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName:"categories"})
export class Category extends Model<Category>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    declare name:string

    @Column({
        type:DataType.STRING,
    })
    declare description:string
}
