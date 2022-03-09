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
  type: process.env.CONNECTION,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: process.env.SYNCHRONIZE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
