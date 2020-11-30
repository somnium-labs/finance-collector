import _ from 'lodash';
import baseConfig from '@/config/default';

const config = _.cloneDeep(baseConfig);

if (process.env.CONFIG) {
    try {
        console.log(`env: ${process.env.CONFIG}`);
        // tslint:disable-next-line:no-var-requires
        _.merge(config, require(`./${process.env.CONFIG}`).default);
    } catch (e) {
        console.log(`Cannot find config: ${process.env.CONFIG}`);
    }
}

export { config };
