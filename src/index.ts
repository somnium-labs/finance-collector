import sequelize from '@/database/sequelizeClient';
import * as argparse from 'argparse';
import KindCollector from '@/provider/kind';
import NaverFinanceCollector from '@/provider/naver';
import _ from 'lodash';

(async () => {
    try {
        const parser = new argparse.ArgumentParser({
            version: '0.0.1',
            addHelp: true,
            description: 'example',
        });

        parser.addArgument(['--init'], {
            required: false,
            nargs: 0,
            help: 'begin date',
        });

        const args = parser.parseArgs();

        await sequelize.initialize();

        if (!args.init) {
            const codes = await KindCollector.updateCorpList();
            await NaverFinanceCollector.updateDailyPrice(_.sortBy(codes, (x) => x, 'asc'));
        }
    } catch (e) {
        console.log(e);
    }
})();
