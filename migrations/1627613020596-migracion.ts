import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627613020596 implements MigrationInterface {
    name = 'migracion1627613020596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "section_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TYPE "section_type_enum" AS ENUM('mandatory', 'elective')`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "status" "section_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "uc" integer NOT NULL, "semester" integer NOT NULL, "type" "section_type_enum" NOT NULL DEFAULT 'mandatory', "ht" double precision NOT NULL, "hp" double precision NOT NULL, "hi" double precision NOT NULL, "schoolId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment_sections_section" ("enrollmentId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "PK_3d0d0d6b96e74ccb81eb2b03b97" PRIMARY KEY ("enrollmentId", "sectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12eb6210a468e0ddcb38c41bbd" ON "enrollment_sections_section" ("enrollmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af0c950ea5a5cf1e0e024ce76f" ON "enrollment_sections_section" ("sectionId") `);
        await queryRunner.query(`ALTER TABLE "school" ADD "facultyId" integer`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_e290c2d1254f2b860ebe9b327c3" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_65d87de17a95f063097c9bdf1ee" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment_sections_section" ADD CONSTRAINT "FK_12eb6210a468e0ddcb38c41bbd4" FOREIGN KEY ("enrollmentId") REFERENCES "enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrollment_sections_section" ADD CONSTRAINT "FK_af0c950ea5a5cf1e0e024ce76f8" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_sections_section" DROP CONSTRAINT "FK_af0c950ea5a5cf1e0e024ce76f8"`);
        await queryRunner.query(`ALTER TABLE "enrollment_sections_section" DROP CONSTRAINT "FK_12eb6210a468e0ddcb38c41bbd4"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_65d87de17a95f063097c9bdf1ee"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_e290c2d1254f2b860ebe9b327c3"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "facultyId"`);
        await queryRunner.query(`DROP INDEX "IDX_af0c950ea5a5cf1e0e024ce76f"`);
        await queryRunner.query(`DROP INDEX "IDX_12eb6210a468e0ddcb38c41bbd"`);
        await queryRunner.query(`DROP TABLE "enrollment_sections_section"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TYPE "section_type_enum"`);
        await queryRunner.query(`DROP TYPE "section_status_enum"`);
    }

}
