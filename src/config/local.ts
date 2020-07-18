import { BaseConfigType } from './default';

const config: BaseConfigType = {
    database: {
        host: 'localhost',
        port: 3306,
        database: 'finance',
        user: 'finance',
        password: 'quant#123!',
        timezone: '+09:00',
        sync: true,
        alter: false,
    },
};

export default config;
