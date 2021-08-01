import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627784654076 implements MigrationInterface {
    name = 'migracion1627784654076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "section_enrollment_status_enum" AS ENUM('enable', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "section_enrollment" ("id" SERIAL NOT NULL, "status" "section_enrollment_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id_section" integer, "id_enrollment" integer, CONSTRAINT "PK_51511df6664096d5e12d34080cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" ADD CONSTRAINT "FK_f8dc70d0cc95931e53e981102fa" FOREIGN KEY ("id_section") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" ADD CONSTRAINT "FK_c45a8b7e397854ff21d39baff33" FOREIGN KEY ("id_enrollment") REFERENCES "enrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_enrollment" DROP CONSTRAINT "FK_c45a8b7e397854ff21d39baff33"`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" DROP CONSTRAINT "FK_f8dc70d0cc95931e53e981102fa"`);
        await queryRunner.query(`DROP TABLE "section_enrollment"`);
        await queryRunner.query(`DROP TYPE "section_enrollment_status_enum"`);
    }

}
