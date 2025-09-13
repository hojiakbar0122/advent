import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/category/model/category.model';

@Table({ tableName: 'tours' })
export class Tour extends Model<Tour> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare days: number;

  @Column({ type: DataType.JSON, allowNull: true })
  declare imgUrls: any; // JSON array

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @Column({ type: DataType.JSON, allowNull: true })
  declare tourInfos: any;

  @Column({ type: DataType.STRING, allowNull: true })
  declare youtubeLink: string;

  @Column({ type: DataType.JSON, allowNull: true })
  declare itinerary: any;

  @Column({ type: DataType.JSON, allowNull: true })
  declare price: any;

  @Column({ type: DataType.JSON, allowNull: true })
  declare datePrices: any;

  @Column({ type: DataType.JSON, allowNull: true })
  declare accomodation: any;

  @Column({ type: DataType.JSON, allowNull: true })
  declare reviews: any;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare routes: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare seasons: string[];
}
