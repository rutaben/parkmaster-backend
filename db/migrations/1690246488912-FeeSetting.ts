import { MigrationInterface, QueryRunner } from "typeorm";

export class FeeSetting1690246488912 implements MigrationInterface {
    name = 'FeeSetting1690246488912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fee_setting" ("id" SERIAL NOT NULL, "vehicleType" character varying NOT NULL, "weekday" character varying NOT NULL, "feeRate" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_7441536769b8b5656135d8740ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fee_setting"`);
    }

}
