import { MigrationInterface, QueryRunner } from "typeorm";

export class InitiateDb1757598752338 implements MigrationInterface {
    name = 'InitiateDb1757598752338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("user_id" uuid NOT NULL, "email" character varying(255) NOT NULL, "display_name" character varying(120) NOT NULL, "bio" text, CONSTRAINT "PK_eee360f3bff24af1b6890765201" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e336cc51b61c40b1b1731308aa" ON "user_profile" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e336cc51b61c40b1b1731308aa"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
