import { BaseConfigType } from './default';

const config: BaseConfigType = {
    database: {
        host: 'localhost',
        port: 3306,
        database: 'finance',
        user: 'finance',
        password: 'finance',
        timezone: '+09:00',
        sync: true, // create table if not exists
        alter: false, // alter table
        logging: false,
    },
};

export default config;
