import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'daily_price',
    underscored: true,
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
    private code!: string;

    @PrimaryKey
    @Column(DataType.DATE)
    private date!: Date;

    @Column(DataType.INTEGER)
    private open: number;

    @Column(DataType.INTEGER)
    private high: number;

    @Column(DataType.INTEGER)
    private low: number;

    @Column(DataType.INTEGER)
    private close: number;

    @Column(DataType.BIGINT)
    private volume: number;
}
