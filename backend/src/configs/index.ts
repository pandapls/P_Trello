import databaseConfig  from './database.json';

export type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake';

interface IDatabaseConfig {
    username : string,
    password : string,
    database : string,
    dialect : Dialect,
    timezone : string,
}

const configs = {
    development : {
        server :  {
            host : 'localhost',
            port : 8080,
        },
        database: databaseConfig.development as IDatabaseConfig
    },
    production : {
        server :  {
            host : 'localhost',
            port : 8080,
        },
        database: databaseConfig.production as IDatabaseConfig

    }
};

type configKeys = keyof typeof configs ;

const NODE_ENV = process.env.NODE_ENV as configKeys || 'development';

export default configs[NODE_ENV] ;