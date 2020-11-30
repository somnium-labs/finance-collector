import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'daily_price',
    underscored: true,
    timestamps: false, // Do not create createdAt, UpdatedAt
    indexes: [
        { name: 'open_index', unique: false, fields: ['open'] },
        { name: 'high_index', unique: false, fields: ['high'] },
        { name: 'low_index', unique: false, fields: ['low'] },
        { name: 'close_index', unique: false, fields: ['close'] },
        { name: 'volume_index', unique: false, fields: ['volume'] },
    ],
})
export default class DailyPrice extends Model<DailyPrice> {
    @PrimaryKey
    @Column
    public code: string;

    @PrimaryKey
    @Column(DataType.DATEONLY)
    public date: Date;

    @Column(DataType.INTEGER)
    public open: number;

    @Column(DataType.INTEGER)
    public high: number;

    @Column(DataType.INTEGER)
    public low: number;

    @Column(DataType.INTEGER)
    public close: number;

    @Column(DataType.BIGINT)
    public volume: number;
}
