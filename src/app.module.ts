import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrchestrationsModule } from './orchestrations/orchestrations.module';
import { DatasModule } from './datas/datas.module';
import { BlocksModule } from './blocks/blocks.module';

@Module({
  imports: [
    /**
     * Config Module Configuration
     */
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'], // Prioritizes specific, falls back to default
    }),

    /**
     * TypeORM Module Configuration
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // Disable sync in production
      }),
    }),

    OrchestrationsModule,

    DatasModule,

    BlocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
