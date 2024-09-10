import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './users/users.entity';

dotenv.config({
  path: `env/.env${process.env.NODE_ENV === 'production' ? '.production' : '.development'}.local`,
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users],
  migrations: ['src/migrations/*.ts'], // 마이그레이션 경로
  synchronize: false, // production 환경에서는 false로 설정
  logging: true, // 로깅 옵션
});
