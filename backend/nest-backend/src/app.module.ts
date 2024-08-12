import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
      // validationSchema,
      load: [],
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      ],
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     await typeOrmConfig(configService),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// function typeOrmConfig(
//   configService: ConfigService<Record<string, unknown>, false>,
// ): any {
//   throw new Error('Function not implemented.');
// }
