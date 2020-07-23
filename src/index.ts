import sequelize from '@/database/sequelizeClient';
import * as argparse from 'argparse';
import KindCollector from '@/provider/kind';
import NaverFinanceCollector from '@/provider/naver';
import _ from 'lodash';
import cron from 'node-cron';

async function update() {
    const codes = await KindCollector.updateCorpList();
    await NaverFinanceCollector.updateDailyPrice(_.sortBy(codes, (x) => x, 'asc'));
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

        const args = parser.parseArgs();

        await sequelize.initialize();

        if (!args.init) {
            // Runs at 4pm on weekdays
            cron.schedule('0 16 * * 1-5', async () => {
                await update();
            });

            // update once
            await update();
        }
    } catch (e) {
        console.log(e);
    }
})();
