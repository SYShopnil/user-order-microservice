## Description

This is a Nest Js Template Project Which is ready to be connected with a database
it also has connection to firebase admin adn aws sdk.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start

# development watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Run App locally in docker environment

```bash
# Create the image

docker build -t ghapfy-img --build-arg DEFAULT_PORT=3000 .
```

```bash
# Run the container

docker run -d --name ghapfy-app --env-file local-docker.env -p 3000:3000  ghapfy-img

```

## Common Commands

```
 # for new module
 $ nest g module new_module

 # for new controller
 $ nest g controller new_controller

 # for new service
 $ nest g module new_service
```

## Use Libraries and Features

```
 1. This project has firebase authentication enabled . it is done using the firebase-admin package
 2. For Database TypeOrm is used
 3. For Storage aws s3 is used with the help of library aws-sdk
 4. For Validation of Incoming requests class-validator and class-transformer library is used
 5. the api documentation is done using swagger. can be found in http://localhost:3000/api/
 7. The environment files can be found under the folder env
 8. The flow of the requests are middlewares -> guardd -> controller -> service -> repository
```

# Nestjs-TypeORM-API

[Dev_Production_Swagger](https://ghapfy.onrender.com/v1/swagger)

[Dev_ERD](https://lucid.app/lucidchart/4921de8d-3026-4f0b-94f8-6747062d9246/edit?viewport_loc=-2173%2C-602%2C6138%2C2172%2C0_0&invitationId=inv_8eef5095-bde0-4b31-8bb7-a35fcb5fb987)

# TypeORM Migration Commands

This section provides an overview of the available TypeORM migration commands in your project. These commands help manage your database schema, generate migrations, and run them in both development and production environments.

### Available Migration Commands

#### 1. **`migration:run`** (Development)

- **Description**: This command runs the migrations in your development environment using the `ormconfig.ts` located in the `src/config` folder.

- **Command**:

  ```bash
  npm run migration:run

  ```

- **Action**: Executes all pending migrations based on the configuration provided in src/config/ormconfig.ts.

#### 2. **`migration:run_prod`** (Production)

- **Description**: This command runs the migrations in your development environment using the `ormconfig.js` located in the `dist/config` folder.

- **Command**:

  ```bash
  npm run migration:run_prod

  ```

- **Action**: Executes all pending migrations based on the compiled configuration in dist/config/ormconfig.js. This is used when running the app in production, where the TypeScript files are already compiled.

#### 3. **`migration:generate`**

- **Description**: This command runs a updated migration and store data into `src/migrations/` When some things will be change in to entity this command will need to generate and then runt npm run migration:run.
- **Command**:

  ```bash
  npm run migration:generate --name=<any name>

  ```

  -**Action**: Generates a new migration file in the src/migrations directory, based on the differences between the current database schema and the defined entities in your code. The migration file will be named with the given <migration-name>.

#### 4. **`migration:create`**

- **Description**: This command runs a new empty migration file in `src/migrations`.
- **Command**:

  ```bash
  npm run migration:create --name=<any name>

  ```

  -**Action**: Creates an empty migration file in the src/migrations folder, which can be edited to include SQL queries or other database changes.

#### 5. **`migration:revert`**

- **Description**: TThis command reverts the last applied migration. It is useful when you want to roll back changes that were previously applied to the database.
- **Command**:

  ```bash
    npm run migration:revert

  ```

-**Action**: Reverts the last migration that was executed based on the configuration in src/config/ormconfig.ts. This can be useful to undo the last migration in case of errors or unwanted changes.

# Developer Policy

## Naming Conventions

This document outlines the naming conventions for DTOs (Data Transfer Objects) and Enums in the project. Following these conventions ensures consistency, readability, and maintainability across the codebase.

### DTO Naming Convention

- **Format**: `D<RestOfTheName>DTO`
- **Purpose**: Each DTO file must start with the letter `D` followed by a meaningful name and end with `DTO` that represents its purpose.

#### Examples:

1. **Create Event DTO**:

   ```typescript
   import { IsString, IsOptional, IsDateString } from 'class-validator';

   export class DCreateEventDTO {
     @IsString()
     thumbnail_img: string;

     @IsOptional()
     @IsString()
     guestList?: string;

     @IsDateString()
     startTime: Date;
   }
   ```

2. **Update Event DTO**:

   ```typescript
   import { IsOptional, IsString, IsDateString } from 'class-validator';

   export class DUpdateEventDTO {
     @IsOptional()
     @IsString()
     thumbnail_img?: string;

     @IsOptional()
     @IsString()
     guestList?: string;

     @IsOptional()
     @IsDateString()
     startTime?: string;
   }
   ```

---

### Enum Naming Convention

- **Format**:`E<Type>`
- **Purpose**: Enum names must start with `E` (for specific types like `Post`, `ErrorCode`, etc.), followed by a descriptive name.

#### Examples:

1. **Error Code Enum**:

   ```typescript
   export enum EErrorCode {
     USER_NOT_FOUND = 'USER_NOT_FOUND',
     INVALID_INPUT = 'INVALID_INPUT',
     SERVER_ERROR = 'SERVER_ERROR',
   }
   ```

2. **Post Enum**:

   ```typescript
   export enum EPost {
     DRAFT = 'DRAFT',
     PUBLISHED = 'PUBLISHED',
     ARCHIVED = 'ARCHIVED',
   }
   ```

3. **Stream Status Enum**:
   ```typescript
   export enum EStreamStatus {
     ACTIVE = 'ACTIVE',
     INACTIVE = 'INACTIVE',
     PENDING = 'PENDING',
   }
   ```

---

### Interface Naming Convention

- **Format**:`I<Type>`
- **Purpose**: Enum names must start with `I` (for specific types like `IUploadedFileType`, `IResultSendMessage`, etc.), followed by a descriptive name.

#### Examples:

1. **Upload file interface**:

   ```typescript
   interface IUploadedFileType {
     fieldname: string;
     originalname: string;
     encoding: string;
     mimetype: string;
     buffer: Buffer;
     size: number;
   }
   ```

2. **Result Sent Interface**:

   ```typescript
   interface IResultSendMessage {
     senderId: string;
     message: string;
     attachments: {
       url: string;
       type: 'VIDEO' | 'FILE' | 'IMAGE';
     }[];
     isRead: boolean;
   }
   ```

---

### Key Points

1. **Consistency**:

   - Always start DTO names with `D` and end with `DTO`.
   - Enums should start with `E` based on the context.
   - Interface should start with `I` based on the context.

2. **Readability**:

   - Use descriptive names that clearly indicate the purpose of the DTO or Enums or Interfaces.

3. **Examples in Documentation**:
   - All code reviews and documentation should adhere to these naming conventions.
