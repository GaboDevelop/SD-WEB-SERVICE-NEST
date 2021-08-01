import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627784558669 implements MigrationInterface {
    name = 'migracion1627784558669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "section_enrolment_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "section_enrolment" ("id" SERIAL NOT NULL, "status" "section_enrolment_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id_section" integer, "id_enrollment" integer, CONSTRAINT "PK_d1c67e1f9ca014f9c2d560ad68b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section_enrolment" ADD CONSTRAINT "FK_35d478ce6e0530d1623f884646f" FOREIGN KEY ("id_section") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_enrolment" ADD CONSTRAINT "FK_846fafc1717b593642b526a6aa2" FOREIGN KEY ("id_enrollment") REFERENCES "enrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_enrolment" DROP CONSTRAINT "FK_846fafc1717b593642b526a6aa2"`);
        await queryRunner.query(`ALTER TABLE "section_enrolment" DROP CONSTRAINT "FK_35d478ce6e0530d1623f884646f"`);
        await queryRunner.query(`DROP TABLE "section_enrolment"`);
        await queryRunner.query(`DROP TYPE "section_enrolment_status_enum"`);
    }

}
