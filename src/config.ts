import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import * as process from 'node:process';
import { createClient } from 'redis';

dotenv.config();

if (process.env.ENVIRONMENT === 'development') {
  dotenv.config({ path: './.env.development.local', override: true });
}

export const postgresDatabase = new DataSource({
  type: 'postgres',
  host: process.env.DATASOURCE_URI,
  port: 5432,
  username: process.env.DATASOURCE_USERNAME,
  password: process.env.DATASOURCE_PASSWORD,
  database: process.env.DATASOURCE_NAME,
  synchronize: true,
  dropSchema: false,
  logging: true,
  ssl: true,
  entities: [ 'src/repository/entity/*.ts', 'src/repository/entity/*.js' ]
});

export const redisCache = createClient({
  url: `rediss://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}:6379/0`,
  pingInterval: 1000
});