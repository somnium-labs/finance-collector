import MarketType from '@/classfication/marketType';
import Universe from '@/database/models/universe';
import _ from 'lodash';
import axios from '@/axiosClient';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import moment from 'moment';

class KindCollector {
    public static create() {
        if (!KindCollector.instance) {
            KindCollector.instance = new KindCollector();
        }
        return KindCollector.instance;
    }

    private static instance: KindCollector;
    private static readonly BASE_URL = 'http://kind.krx.co.kr';

    private universe: Universe[] = [];

    /**
     * @desc 신규상장 종목 및 상장폐지 종목 업데이트
     * @returns 상장폐지 종목을 제외한 종목코드
     */
    public async updateCorpList() {
        this.universe = await Universe.findAll({
            attributes: ['code'],
        });

        const listing: Universe[] = [];
        const delisting: Universe[] = [];

        // 코스피 상장법인
        const kospiList = await this.downloadCorpListByMarketType(
            MarketType.Kospi,
            '13',
        );
        if (kospiList) {
            kospiList.forEach((x) => {
                listing.push(x);
            });
        }

        // 코스닥 상장법인
        const kosdaqList = await this.downloadCorpListByMarketType(
            MarketType.Kosdaq,
            '13',
        );
        if (kosdaqList) {
            kosdaqList.forEach((x) => {
                listing.push(x);
            });
        }

        // 코스피 상폐법인
        const kospiDelist = await this.downloadCorpListByMarketType(
            MarketType.Kospi,
            '01',
        );
        if (kospiDelist) {
            kospiDelist.forEach((x) => {
                if (!_.find(listing, { code: x.code })) {
                    delisting.push(x);
                }
            });
        }

        // 코스닥 상폐법인
        const kosdaqDelist = await this.downloadCorpListByMarketType(
            MarketType.Kosdaq,
            '01',
        );
        if (kosdaqDelist) {
            kosdaqDelist.forEach((x) => {
                if (!_.find(listing, { code: x.code })) {
                    delisting.push(x);
                }
            });
        }

        // 신규상장 업데이트
        const newListing = _.differenceBy(listing, this.universe, 'code');
        if (0 < newListing.length) {
            await Universe.bulkCreate(
                newListing.map((u) => JSON.parse(JSON.stringify(u))),
            );
        }

        // 상장폐지 업데이트
        delisting.forEach(async (x) => {
            if (_.find(this.universe, { code: x.code })) {
                await Universe.update(
                    {
                        delisted: true,
                    },
                    {
                        where: { code: x.code },
                    },
                );
            }
        });

        return listing.map((x) => x.code);
    }

    private async downloadCorpListByMarketType(
        marketType: MarketType,
        searchType: string,
    ) {
        try {
            const html = await this.downloadCorpList(marketType, searchType);
            const $ = cheerio.load(html);
            const universe: Universe[] = [];

            $('table tr').each((index, element) => {
                if (index !== 0) {
                    const columns = $(element).find('td');
                    const stock = new Universe({
                        marketType: marketType,
                        name: $(columns[0]).text(),
                        code: $(columns[1]).text(),
                        sector: $(columns[2]).text(),
                        product: $(columns[3]).text(),
                        listingDate: moment(
                            $(columns[4]).text(),
                            'YYYY-MM-DD',
                        ).toDate(),
                    });

                    universe.push(stock);
                }
            });
            return universe;
        } catch (error) {
            console.error(`Failed to updateCorpList() => ${error}`);
        }
    }

    /**
     *
     * @param marketType 시장구분
     * @param searchType 13: 상장법인 01: 관리종목(상장법인 및 상장폐지 모두 포함)
     */
    private async downloadCorpList(marketType: MarketType, searchType: string) {
        try {
            const market =
                marketType === MarketType.Kosdaq ? 'kosdaqMkt' : 'stockMkt';
            const url = `${KindCollector.BASE_URL}/corpgeneral/corpList.do?method=download&searchType=${searchType}&marketType=${market}`;
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
            });
            return iconv.decode(Buffer.from(response.data), 'euc-kr');
        } catch (error: any) {
            console.error(Object.keys(error), error.message);
            throw error;
        }
    }
}

export default KindCollector.create();
