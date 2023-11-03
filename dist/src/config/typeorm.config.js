"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = exports.typeormConfigAsync = void 0;
const path_1 = require("path");
const config_1 = require("@nestjs/config");
exports.typeormConfigAsync = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async () => {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{ts,js}')],
            synchronize: true,
            logging: true,
        };
    },
};
exports.typeormConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: false,
    logging: true,
    migrations: [(0, path_1.join)(__dirname, '..', 'migrations', '*.{ts,js}')],
    cli: {
        migrationsDir: (0, path_1.join)(__dirname, '..', 'migrations'),
    },
};
//# sourceMappingURL=typeorm.config.js.map