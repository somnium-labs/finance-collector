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

        parser.addArgument(['-b', '--begin'], {
            required: false,
            help: 'begin date',
        });

        parser.addArgument(['-e', '--end'], {
            required: false,
            help: 'end date',
        });

        const args = parser.parseArgs();
        console.log(args);

        await sequelize.initialize();

        const codes = await KindCollector.updateCorpList();
        await NaverFinanceCollector.updateDailyPrice(_.sortBy(codes, (x) => x, 'asc'));
    } catch (e) {
        console.log(e);
    }
})();
