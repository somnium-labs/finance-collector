import cheerio from 'cheerio';
import moment from 'moment';
import _ from 'lodash';
import puppeteer from 'puppeteer';
import IncomeStatement from '@/database/models/incomeStatement';

class ItoozaCollector {
    public static create() {
        if (!ItoozaCollector.instance) {
            ItoozaCollector.instance = new ItoozaCollector();
        }
        return ItoozaCollector.instance;
    }

    private static instance: ItoozaCollector;

    public async getFinancialStatement(stockCodes: string[]) {
        const browser = await puppeteer.launch({ headless: true }); // Do not launch the browser.
        const page = await browser.newPage();

        await page.goto('https://login.itooza.com/login.htm');
        await page.evaluate(
            (id, pw) => {
                (document.querySelector('#txtUserId') as HTMLInputElement).value = id;
                (document.querySelector('#txtPassword') as HTMLInputElement).value = pw;
            },
            'acepm83',
            'qq0920pp',
        );

        await page.click('#login-container-01 > div.boxBody > div.leftCol > div.login-box-wrap > div.btn-login > input[type=image]');
        await page.waitForNavigation();

        for (const stockCode of stockCodes) {
            await this.updateIncomStatement(page, stockCode, 'dy'); // 연간
            await this.updateIncomStatement(page, stockCode, 'db'); // 분기
        }
    }

    private async updateIncomStatement(page: puppeteer.Page, stockCode: string, mode: string) {
        const accmode = 1; // 1: ifrs 2: gaap
        const lsmode = 2; // order by date asc
        const lkmode = 1; // 1:연결 2:개별
        const pmode = 1; // 1:소수점 제외 2: 소수점(1자리)
        const exmode = 1; // 1: 확장안함 2: 확장

        const param = `cmp_cd=${stockCode}&mode=${mode}&ss=10&sv=2&lsmode=${lsmode}&lkmode=${lkmode}&pmode=${pmode}&exmode=${exmode}&accmode=${accmode}`;
        const url = `http://www.itooza.com/vclub/y10_page.php?${param}`;
        const response = await page.goto(url);
        if (response) {
            const html = await response.text();
            const $ = cheerio.load(html);
            const unitPeriod: string = mode === 'dy' ? 'year' : 'quater';
            const incomeStatements: IncomeStatement[] = [];

            const data = $('#y10_tb_2 tr');
            $(data[0])
                .find('th span')
                .each((i, e) => {
                    const date = $(e).text();
                    incomeStatements.push(new IncomeStatement({ code: stockCode, date: date, unitPeriod: unitPeriod }));
                });

            // 매출액
            $(data[1])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].sales = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 매출원가
            $(data[6])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].costOfSales = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 매출총이익
            $(data[13])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].grossProfit = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 판매비와관리비
            $(data[14])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].sellingAndAdministrativeExpenses = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 영업이익
            $(data[36])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].operatingIncome = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 법인세비용차감전계속사업이익
            $(data[119])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].continuingOperationsIncomeBeforeIncomeTax = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 당기순이익
            $(data[122])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].netIncome = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 당기순이익(지배)
            $(data[123])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].controllingInterest = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 당기순이익(비지배)
            $(data[124])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].nonControllingInterest = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // EPS
            $(data[137])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].EPS = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // EBITDA
            $(data[138])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].EBITDA = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 주가
            $(data[139])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].stockPrice = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // 시가총액
            $(data[140])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].marketCap = parseInt(sales.replace(',', ''), 10);
                    }
                });

            // PER
            $(data[141])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].PER = parseFloat(sales.replace(',', ''));
                    }
                });

            // DPS(주당배당금)
            $(data[142])
                .find('td')
                .each((i, e) => {
                    const sales = $(e).text();
                    if (sales !== 'N/A') {
                        incomeStatements[i].DPS = parseFloat(sales.replace(',', ''));
                    }
                });

            IncomeStatement.bulkCreate(incomeStatements.map((u) => JSON.parse(JSON.stringify(u)))).then(() => {
                console.log(`[${moment().format('HH:mm:ss')}] Incom statement(${unitPeriod}) completed => code: ${stockCode}`);
            });
        }
    }
}

export default ItoozaCollector.create();
