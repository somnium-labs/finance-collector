import cheerio from 'cheerio';
import axios from '@/axiosClient';
import * as util from '@/util';
import iconv from 'iconv-lite';
import moment from 'moment';
import DailyPrice from '@/database/models/dailyPrice';
import _ from 'lodash';

class NaverFinanceCollector {
    public static create() {
        if (!NaverFinanceCollector.instance) {
            NaverFinanceCollector.instance = new NaverFinanceCollector();
        }
        return NaverFinanceCollector.instance;
    }

    private static instance: NaverFinanceCollector;
    private static readonly BASE_URL = 'https://fchart.stock.naver.com';
    private static readonly FIRST_DATE = moment('19900103', 'YYYYMMDD');

    public async updateDailyPrice(codes: string[]) {
        for (const code of codes) {
            const latest = await DailyPrice.findOne({
                where: { code: code },
                order: [['date', 'DESC']],
                limit: 1,
            });

            const day = latest
                ? util.calculateBusinessDays(
                      moment(latest.date),
                      moment().isAfter(moment().format('YYYY-MM-DD 16:00:00')) ? moment() : moment().add(-1, 'day'),
                  )
                : util.calculateBusinessDays(moment('1990-01-03', 'YYYY-MM-DD'), moment());

            if (0 < day) {
                const dailyPrice: DailyPrice[] = [];
                const xml = await this.getDailyPrice(code, day);
                if (xml) {
                    const $ = cheerio.load(xml, { xmlMode: true });
                    const item = $('item');
                    item.each(async (index, element) => {
                        const data = $(element).attr('data');
                        const splitting = data?.split('|');
                        if (splitting) {
                            const ohlcv = new DailyPrice({
                                code: code,
                                date: moment(splitting[0], 'YYYYMMDD'),
                                open: parseInt(splitting[1], 10),
                                high: parseInt(splitting[2], 10),
                                low: parseInt(splitting[3], 10),
                                close: parseInt(splitting[4], 10),
                                volume: parseInt(splitting[5], 10),
                            });

                            dailyPrice.push(ohlcv);
                        }
                    });

                    console.log(`[${moment().format('HH:mm:ss')}] get => code: ${code} count: ${item.length}`);
                    DailyPrice.bulkCreate(dailyPrice.map((u) => JSON.parse(JSON.stringify(u)))).then(() => {
                        console.log(`[${moment().format('HH:mm:ss')}] completed => code: ${code}`);
                    });
                }
            }
        }
    }

    private async getDailyPrice(code: string, count: number) {
        const url = `${NaverFinanceCollector.BASE_URL}/sise.nhn?symbol=${code}&timeframe=day&count=${count}&requestType=0`;
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return iconv.decode(Buffer.from(response.data), 'euc-kr');
        } catch (error) {
            console.error(Object.keys(error), error.message);
        }
    }
}

export default NaverFinanceCollector.create();
