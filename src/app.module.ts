import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrchestrationsModule } from './orchestrations/orchestrations.module';
import { ModulesModule } from './modules/modules.module';
import { DatasModule } from './datas/datas.module';

@Module({
  imports: [
    /**
     * Config Module Configuration
     */
    ConfigModule.forRoot(),

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
        synchronize: true, // For dev only; disable in production
      }),
    }),

    OrchestrationsModule,

    ModulesModule,

    DatasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
