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

# https://docs.nestjs.com/cli/usages#nest-new
# Create a new NestJS project on current folder:
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

we use Podman Compose.

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
import { ConfigModule } from '@nestjs/config';

@Module({
  //https://docs.nestjs.com/techniques/configuration
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
```

## 5. Configure Database Connection

Add imports in `app.module.ts`:

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

> Open Swagger UI by http://localhost:3000/api

## 7. Create Module, Controller, Service, and Entities

```sh
# https://docs.nestjs.com/cli/usages#nest-generate
# use plural
nest generate resource orchestrations
```

## 8. Define Entities

Add imports in `orchestrations.module.ts`:

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orchestration } from './entities/orchestration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orchestration])],
})
```

Edit entity in `src/orchestrations/entities/orchestration.entity.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// A minimal entity
@Entity()
export class Orchestration {
  @PrimaryGeneratedColumn() // auto-incremented primary key
  id: number;
}
```

Add Columns:

```typescript
@Entity()
export class Orchestration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // unique column need extra exception handling
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer', array: true }) // if arrary, type need to be specified
  blocks_order: number[];

  @Column({
    type: 'enum', // necessary to add type for enum
    enum: OrchestrationType,
    default: OrchestrationType.TYPEA, // optional
  })
  type: OrchestrationType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
```

> More about Entity Columns: https://typeorm.io/entities#entity-columns

> More about Column Types: https://typeorm.io/entities#column-types

## 9. Define Relations

- ### Basic Concept

  - Owning Side:

    - The owning side of a relationship is the side that holds the foreign key column in the database
    - Only the owning side should use decorators like `@JoinColumn()` or `@JoinTable()`.

  - Inverse Side:

    - The inverse side refers to the side that doesn't hold the foreign key.

  - Unidirectional

  - Bidirectional

- ### OneToOne

  > Refer to https://typeorm.io/one-to-one-relations

    <img src="./static/OneToOne.png" alt="OneToOneRelation" width="500">

  ```typescript
  // This is a standard exmaple, we did not follow this in the final code for some extra feature.
  // Parent, Inverse Side
  @Entity()
  export class Orchestration {
    // ...
    @OneToOne(() => Data, (data) => data.orchestration) // bidirectional relation
    data: Data;
  }

  // Child, Owning Side
  @Entity()
  export class Data {
    // ...
    @OneToOne(() => Orchestration, (orchestration) => orchestration.data)
    @JoinColumn() // suggest add JoinColumn() to Child, the FK will be added here
    orchestration: Orchestration;
  ```

- ### ManyToOne / OneToMany

  > Refer to https://typeorm.io/many-to-one-one-to-many-relations

  Similar to OneToOne, but no `@JoinColumn()` required.

  _One_ indicates the Parent (`@OneToMany()`), and _Many_ indicates the Child (`@ManyToOne()`).

  Foreign key will automatically added to the _Many_ (child) side

- ### ManyToMany

  > Refer to https://typeorm.io/many-to-many-relations

  <img src="./static/ManyToMany.png" alt="ManyToManyRelation" width="500">

  ```typescript
  // Owning Side (although in ManyToMany relationship there is no a clear owning side)
  @Entity()
  export class Orchestration {
    // ...
    @ManyToMany(() => Block, (block) => block.orchestrations) // bidirectional relation
    @JoinTable() // suggest add JoinTable() to the owning side
    blocks: Block[];
  }

  // Inverse Side
  @Entity()
  export class Block {
    // ...
    @ManyToMany(() => Orchestration, (orchestration) => orchestration.blocks)
    orchestrations: Orchestration[];
  ```

- ### Relation Options

  > Refer to https://typeorm.io/relations#relation-options and https://typeorm.io/eager-and-lazy-relations

  - `eager: boolean (default: false)` - If set to true, the relation will always be loaded with the main entity when using find\* methods or QueryBuilder on this entity
  - `cascade: boolean | ("insert" | "update" | "remove" | "soft-remove" | "recover")[]. (default: false)` - If set to true, the related object will be inserted and updated in the database
  - `onDelete: "RESTRICT"|"CASCADE"|"SET NULL" (default: RESTRICT)` - specifies how foreign key should behave when referenced object is deleted
  - `nullable: boolean (default: true)` - Indicates whether this relation's column is nullable or not. By default it is nullable.
  - `orphanedRowAction: "nullify" | "delete" | "soft-delete" | "disable" (default: disable)`

## 10. Define API Endpoints

Define API Endpoints (Basic CRUD will be defined automatically by cli `nest g resource`):

```typescript
  @Post()
  create(@Body() createDataDto: CreateDataDto) {
    return this.datasService.create(createDataDto);
  }
```

- @Param():
  ```typescript
  @Get(':id/:name')
  getUser(@Param() params: { id: string; name: string }) { // always return string by reading from url, add Pipes to convert it into number
    return `User ID: ${params.id}, Name: ${params.name}`;
  }
  ```
  Extracts both id and name from the URL (e.g., `/users/123/John`)
- @Query():

  ```typescript
  @Get()
  findAll(@Query() query: { page: string; limit: string }) {
    return `Page: ${query.page}, Limit: ${query.limit}`;
  }
  ```

  Extracts multiple query parameters (e.g., `/users?page=1&limit=10`).

- @Body():

  ```typescript
  @Post()
  createUser(@Body('name') name: string) {
    return `User Name: ${name}`;
  }
  ```

  Extracts only the `name` field from the request body. To extracts the entire body, use DTO

> More about request object: https://docs.nestjs.com/controllers#request-object

## 12. Setup Validation with Pipes and DTOs

### Build-in pipes: `ParseIntPipe` `ParseBoolPipe` `ParseArrayPipe` `ParseUUIDPipe`:

transfer string to the corresponding value, for exmaple:

```typescript
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) { // convert id into int using Pipes
  return `User ID: ${id}`;
}
```

or do it manually

```typescript
@Get(':id')
getUser(@Param('id') id: string) {
  return `User ID: ${+id}`; // convert id into int manually
}
```

### DTO:

Set up `useGlobalPipes`:

> Details on https://docs.nestjs.com/techniques/validation

## 13. Implement Service

## 14. Implement Unit Tests
