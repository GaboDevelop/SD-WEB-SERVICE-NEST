import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627610481476 implements MigrationInterface {
    name = 'migracion1627610481476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "enrollment_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TYPE "enrollment_type_enum" AS ENUM('student', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" SERIAL NOT NULL, "status" "enrollment_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "type" "enrollment_type_enum" NOT NULL DEFAULT 'student', "personId" integer, CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "faculty_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "faculty" ("id" SERIAL NOT NULL, "status" "faculty_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_635ca3484f9c747b6635a494ad9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "school_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "school" ("id" SERIAL NOT NULL, "status" "school_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_167ec5d0aaad4b3908bbfeb2789" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_167ec5d0aaad4b3908bbfeb2789"`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "update_at"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TYPE "school_status_enum"`);
        await queryRunner.query(`DROP TABLE "faculty"`);
        await queryRunner.query(`DROP TYPE "faculty_status_enum"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`DROP TYPE "enrollment_type_enum"`);
        await queryRunner.query(`DROP TYPE "enrollment_status_enum"`);
    }

}
