import { Table, Column, Model, DataType } from 'sequelize-typescript';
import MarketType from '@/classfication/marketType';

@Table({
    tableName: 'universe',
    underscored: true,
    indexes: [
        { unique: true, fields: ['code'] },
        { unique: true, fields: ['name'] },
        { unique: false, fields: ['sector'] },
        { unique: false, fields: ['market_type'] },
        { unique: false, fields: ['listing_date'] },
    ],
})
export default class Universe extends Model<Universe> {
    @Column
    private code: string;

    @Column(DataType.ENUM(MarketType.Kosdaq, MarketType.Kospi))
    private marketType: MarketType;

    @Column
    private name: string;

    @Column
    private sector: string;

    @Column
    private product: string;

    @Column(DataType.DATEONLY)
    private listingDate: Date;
}
