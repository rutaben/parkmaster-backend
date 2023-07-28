import { DataSource, DataSourceOptions } from 'typeorm';

// Sets up data source config to connect to Postgres database

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'parkmaster.cnr98llcu0ek.eu-north-1.rds.amazonaws.com',
  port: 5432,
  username: 'parkmaster',
  password: 'parkmaster',
  database: 'postgres',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
