import { MigrationInterface, QueryRunner } from "typeorm";

export class IntitiateDb1757596534354 implements MigrationInterface {
    name = 'IntitiateDb1757596534354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "refresh_token_hash" character varying(255), "roleId" uuid, CONSTRAINT "PK_56a085125d8c8fc776e73a32b26" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3d29d788cd69d1ddf87e88e01e" ON "auth_user" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."role_name_enum" NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_user" ADD CONSTRAINT "FK_5fdc427acff14b27bd71d4865c9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_user" DROP CONSTRAINT "FK_5fdc427acff14b27bd71d4865c9"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d29d788cd69d1ddf87e88e01e"`);
        await queryRunner.query(`DROP TABLE "auth_user"`);
    }

}
