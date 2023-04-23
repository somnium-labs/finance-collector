import * as argparse from 'argparse';

import ItoozaCollector from '@/provider/itooza';
import KindCollector from '@/provider/kind';
import NaverFinanceCollector from '@/provider/naver';
import _ from 'lodash';
import cron from 'node-cron';
import moment from 'moment';
import sequelize from '@/database/sequelizeClient';

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
            add_help: true,
            description: 'Finance Collector',
        });

        parser.add_argument('--init', {
            required: false,
            action: 'store_true',
            help: 'Initialize only the database.',
        });

        parser.add_argument('--fs', {
            required: false,
            action: 'store_true',
            help: 'Financial Statement Update.',
        });

        const args = parser.parse_args();

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
