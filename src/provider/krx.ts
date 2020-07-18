import cheerio from 'cheerio';
import axios from '@/axiosClient';
import MarketType from '@/classfication/marketType';
import iconv from 'iconv-lite';
import moment from 'moment';
import Universe from '@/database/models/universe';
import _ from 'lodash';

export default class KindCollector {
    private static readonly KIND_URL = 'http://kind.krx.co.kr/corpgeneral';

    public async updateCorpList() {
        // 상장폐지된 종목이 있을 수 있으므로 truncate 후에 insert 한다.
        Universe.destroy({ truncate: true, cascade: false });

        await this.updateCorpListByMarketType(MarketType.Kospi);
        await this.updateCorpListByMarketType(MarketType.Kosdaq);
    }

    private async updateCorpListByMarketType(marketType: MarketType) {
        try {
            const html = await this.downloadCorpList(marketType);
            const $ = cheerio.load(html);
            const universes: Universe[] = [];
            const date = new Date();

            $('table tr').each((index, element) => {
                if (index !== 0) {
                    const columns = $(element).find('td');
                    const universe = new Universe({
                        updateDate: date,
                        marketType: marketType,
                        name: $(columns[0]).text(),
                        code: $(columns[1]).text(),
                        sector: $(columns[2]).text(),
                        product: $(columns[3]).text(),
                        listingDate: moment($(columns[4]).text(), 'YYYY-MM-DD').toDate(),
                    });
                    universes.push(universe);
                }
            });

            await Universe.bulkCreate(universes.map((u) => JSON.parse(JSON.stringify(u))));
            console.log(`Collection completed: ${marketType}`);
        } catch (error) {
            console.error(`Failed to updateCorpList() => ${error}`);
        }
    }

    private async downloadCorpList(marketType: MarketType) {
        try {
            const market = marketType === MarketType.Kosdaq ? 'kosdaqMkt' : 'stockMkt';
            const url = `${KindCollector.KIND_URL}/corpList.do?method=download&searchType=13&marketType=${market}`;
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return iconv.decode(Buffer.from(response.data), 'euc-kr');
        } catch (error) {
            console.error(Object.keys(error), error.message);
            throw error;
        }
    }
}
