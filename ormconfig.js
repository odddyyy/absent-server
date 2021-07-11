require('dotenv').config();
module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: 'postgres',
  entities: ['dist/libs/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*.entity{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
  logging: ['query', 'error'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
