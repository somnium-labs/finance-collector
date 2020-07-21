import { BaseConfigType } from './default';

const config: BaseConfigType = {
    database: {
        host: '192.168.0.3',
        port: 3306,
        database: 'finance',
        user: 'finance',
        password: 'quant#123!',
        timezone: '+09:00',
        sync: true, // create table if not exists
        alter: false, // alter table
        logging: false,
    },
};

export default config;
