import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
import MarketType from '@/classfication/marketType';

@Table({
    tableName: 'universe',
    underscored: true,
    timestamps: false, // Do not create createdAt, UpdatedAt
    indexes: [
        { unique: true, fields: ['code'] },
        { unique: true, fields: ['name'] },
        { unique: false, fields: ['sector'] },
        { unique: false, fields: ['market_type'] },
        { unique: false, fields: ['listing_date'] },
        { unique: false, fields: ['delisted'] },
    ],
})
export default class Universe extends Model<Universe> {
    @Column
    public code: string;

    @Column(DataType.ENUM(MarketType.Kosdaq, MarketType.Kospi))
    public marketType: MarketType;

    @Column
    public name: string;

    @Column
    public sector: string;

    @Column
    public product: string;

    @Column(DataType.DATEONLY)
    public listingDate: Date;

    @Column(DataType.BOOLEAN)
    public delisted: boolean = false;
}
