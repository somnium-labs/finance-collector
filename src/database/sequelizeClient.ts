import { Sequelize } from 'sequelize-typescript';
import { config } from '@/config';
import Universe from '@/database/models/universe';
import Ohlc from '@/database/models/dailyPrice';

class SequelizeClient {
    public static create() {
        if (!SequelizeClient.instance) {
            SequelizeClient.instance = new SequelizeClient();
        }
        return SequelizeClient.instance;
    }

    private static instance: SequelizeClient;

    private sequelize: Sequelize;

    private constructor() {}

    public async initialize() {
        try {
            this.sequelize = new Sequelize({
                host: config.database.host,
                port: config.database.port,
                database: config.database.database,
                dialect: 'mysql',
                username: config.database.user,
                password: config.database.password,
                timezone: config.database.timezone,
                logging: config.database.logging,
            });

            this.sequelize.addModels([Universe, Ohlc]);

            await this.sequelize.authenticate();
            console.log(`connected to db: ${config.database.host}`);
            if (config.database.sync) {
                await this.sequelize.sync({ alter: config.database.alter });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export default SequelizeClient.create();
