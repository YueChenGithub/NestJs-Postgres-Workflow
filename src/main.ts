import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PostgresExceptionFilter } from './postgres-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // /**
  //  * Set NODE_ENV, Default to `.env` if NODE_ENV is not set
  //  */
  // const envFilePath = `.env${process.env.NODE_ENV ?? ''}`;
  // dotenv.config({ path: path.resolve(process.cwd(), envFilePath) });

  /*
   * Use validation pipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * register filter for postgresql
   */
  app.useGlobalFilters(new PostgresExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
