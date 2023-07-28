import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicle1690502298921 implements MigrationInterface {
    name = 'Vehicle1690502298921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "plateNumber" character varying NOT NULL, "vehicleType" character varying NOT NULL, "arrival" TIMESTAMP NOT NULL, "departure" TIMESTAMP, "timeTotal" integer, "feeTotal" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
