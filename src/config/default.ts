const config = {
    database: {
        host: 'localhost',
        port: 3306,
        database: 'finance',
        user: 'finance',
        password: 'finance',
        timezone: '+00:00',
        sync: true, // create table if not exists
        alter: false, // alter table
        logging: false,
    },
};

export default config;

// tslint:disable:array-type
// tslint:disable:no-shadowed-variable
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>;
};

export type BaseConfigType = DeepPartial<typeof config>;
