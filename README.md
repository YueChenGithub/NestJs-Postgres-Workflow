<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Description

A personal workflow for developing backend database using Typescript and NestJS.

## Setup

### Project Setup

```sh
# Install NestJS CLI:
npm i -g @nestjs/cli

# Run the following command to create a new NestJS project on current folder:
nest new .
```

### Compile and run the project

```sh
# development
npm run start

# watch mode
npm run start:dev
```

### Run tests

```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

# Workflow

## 1. Define Entities relationship:

[Diagram]

## 2. Install dependencies

```sh
npm install @nestjs/typeorm typeorm pg
npm install class-validator class-transformer
npm install @nestjs/config
npm install @nestjs/swagger swagger-ui-express
```

## 3. Configure Database

we use Podman compose.

Create a `podman-compose.yml` in root directory:

```yaml
version: '3.8'

services:
  postgres:
    image: docker.io/library/postgres:latest
    container_name: postgres_workflow
    hostname: postgres_workflow
    ports:
      - '5430:5432'
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: mydb
    volumes:
      - postgres_workflow_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_workflow_data:
```

Run the Container:

```sh
podman compose --file .\podman-compose.yml up --build -d
```

Stop the Container:

```sh
podman compose --file .\podman-compose.yml down
```

Test the Connection:

```sh
psql -h localhost -p 5430 -U admin -d mydb
```

## 4. Set Up Configuration Management

Create `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5430
DATABASE_USER=admin
DATABASE_PASSWORD=admin
DATABASE_NAME=mydb
```

Add imports `app.module.ts`:

```typescript
@Module({
  //https://docs.nestjs.com/techniques/configuration
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
```

## 5. Configure Database Connection

Add imports in `app.module.ts`:

```typescript
@Module({
  imports: [
    // https://docs.nestjs.com/techniques/database
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
  ],
})


```

## 6. Set Up Swagger UI

Modify `main.ts`:

```typescript
async function bootstrap() {
  // ...
  //https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ...
}
```

Open Swagger UI by http://localhost:3000/api

## 7. Create Module, Service, and Controller

## 8. Create Entities

## 9. Define API Endpoints

## 10. Setup Validation with DTOs

## 11. Implement Service & Controller

## 12. Implement Unit Tests
