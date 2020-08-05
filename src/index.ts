import sequelize from '@/database/sequelizeClient';
import * as argparse from 'argparse';
import KindCollector from '@/provider/kind';
import NaverFinanceCollector from '@/provider/naver';
import ItoozaCollector from '@/provider/itooza';
import _ from 'lodash';
import cron from 'node-cron';
import moment from 'moment';

async function update(fs: boolean) {
    console.log(`[${moment().format('HH:mm:ss')}] Start the update.`);
    const codes = await KindCollector.updateCorpList();
    const stockCodes = _.sortBy(codes, (x) => x, 'asc');

    // 재무제표 from www.itooza.com
    if (fs) {
        console.log('Start updating financial statements.');
        await ItoozaCollector.getFinancialStatement(stockCodes);
    }

    console.log('Start updating daily market price.');
    await NaverFinanceCollector.updateDailyPrice(stockCodes);
    console.log(`[${moment().format('HH:mm:ss')}] Update completed.`);
}

(async () => {
    try {
        const parser = new argparse.ArgumentParser({
            version: '0.0.1',
            addHelp: true,
            description: 'Finance Collector',
        });

        parser.addArgument(['--init'], {
            required: false,
            nargs: 0,
            help: 'Initialize only the database.',
        });

        parser.addArgument(['--fs'], {
            required: false,
            nargs: 0,
            help: 'Financial Statement Update.',
        });

        const args = parser.parseArgs();

        await sequelize.initialize();

        if (!args.init) {
            const fs: boolean = args.fs;

            // Runs at 4pm on weekdays
            cron.schedule('0 16 * * 1-5', async () => {
                await update(fs);
            });

            // update once
            await update(fs);
        }
    } catch (e) {
        console.log(e);
    }
})();
