/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

// module.exports = {
//   type: process.env.CONNECTION,
//   host: process.env.HOST,
//   port: 5432,
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   entities: ['src/**/*.entity{.ts,.js}'],
//   synchronize: process.env.SYNCHRONIZE,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//   cli: {
//     migrationsDir: 'src/database/migrations',
//   },
// };
module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
