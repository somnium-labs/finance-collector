import * as util from '@/util';

import DailyPrice from '@/database/models/dailyPrice';
import axios from '@/axiosClient';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import moment from 'moment';

class NaverFinanceCollector {
    public static create() {
        if (!NaverFinanceCollector.instance) {
            NaverFinanceCollector.instance = new NaverFinanceCollector();
        }
        return NaverFinanceCollector.instance;
    }

    private static instance: NaverFinanceCollector;
    private static readonly BASE_URL = 'https://fchart.stock.naver.com';

    public async updateDailyPrice(codes: string[]) {
        for (const code of codes) {
            const completed = await this.tryUpdate(code);
            if (!completed) {
                await this.tryUpdate(code);
            }
            process.stdout.write(`complete: ${code}\r`);
        }
    }

    private async getDailyPrice(code: string, count: number) {
        const url = `${NaverFinanceCollector.BASE_URL}/sise.nhn?symbol=${code}&timeframe=day&count=${count}&requestType=0`;
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
            });
            return iconv.decode(Buffer.from(response.data), 'euc-kr');
        } catch (error: any) {
            console.error(Object.keys(error), error.message);
        }
    }

    private async tryUpdate(code: string) {
        return new Promise<boolean>(async (resolve) => {
            const latest = await DailyPrice.findOne({
                where: { code: code },
                order: [['date', 'DESC']],
                limit: 1,
            });

            const day = latest // 필요한 거래일 계산
                ? util.calculateBusinessDays(
                      moment(latest.date).add(1, 'day'),
                      moment().isAfter(moment().format('YYYY-MM-DD 16:00:00'))
                          ? moment().add(1, 'day')
                          : moment(),
                  )
                : util.calculateBusinessDays(
                      moment('1990-01-03', 'YYYY-MM-DD'),
                      moment(),
                  );

            let changed!: Promise<number>;

            if (0 < day) {
                const dailyPrice: DailyPrice[] = [];
                const xml = await this.getDailyPrice(code, day + 1);
                await util.delay(100);
                if (xml) {
                    const $ = cheerio.load(xml, { xmlMode: true });
                    $('item').each((index, element) => {
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

                            // 마지막에 저장된 데이터와 비교하여 수정주가가 발생했는지 확인
                            // 수정주가(Adjust Price)란 총 발행 주식수의 변화를 반영한 가격을 말합니다.
                            // 액면분할, 액면병합, 유상증자, 무상증자와 같이 총 발행주식수의 변화가 발생하면 가격의 변화가 생깁니다.
                            if (latest && index === 0) {
                                if (
                                    latest.open !== ohlcv.open ||
                                    latest.high !== ohlcv.high ||
                                    latest.low !== ohlcv.low ||
                                    latest.close !== ohlcv.close
                                ) {
                                    // 새로운 수정주가를 저장하기 전에 기존 데이터를 삭제
                                    changed = DailyPrice.destroy({
                                        where: { code: code },
                                    });

                                    return false; // === break
                                }
                            } else {
                                dailyPrice.push(ohlcv);
                            }
                        }
                    });

                    if (0 < dailyPrice.length) {
                        DailyPrice.bulkCreate(
                            dailyPrice.map((u) =>
                                JSON.parse(JSON.stringify(u)),
                            ),
                        )
                            .then(() => {
                                console.log(
                                    `[${moment().format(
                                        'HH:mm:ss',
                                    )}] completed => code: ${code}`,
                                );
                            })
                            .catch((error) => {
                                console.log(
                                    `failed => code: ${code}, error: ${error}`,
                                );
                            });
                    }
                }
            }

            if (changed) {
                await changed;
                resolve(false); // 시세정보 재요청
            } else {
                resolve(true);
            }
        });
    }
}

export default NaverFinanceCollector.create();
