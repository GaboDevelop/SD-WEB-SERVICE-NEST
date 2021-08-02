import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627859607431 implements MigrationInterface {
    name = 'migracion1627859607431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "status" "person_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "ci" character varying NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faculty" ("id" SERIAL NOT NULL, "status" "faculty_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_635ca3484f9c747b6635a494ad9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school" ("id" SERIAL NOT NULL, "status" "school_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "id_faculty" integer, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "status" "section_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "uc" integer NOT NULL, "semester" integer NOT NULL, "type" "section_type_enum" NOT NULL DEFAULT 'mandatory', "ht" double precision NOT NULL, "hp" double precision NOT NULL, "hi" double precision NOT NULL, "id_school" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section_enrollment" ("id" SERIAL NOT NULL, "status" "section_enrollment_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id_section" integer, "id_enrollment" integer, CONSTRAINT "PK_51511df6664096d5e12d34080cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" SERIAL NOT NULL, "status" "enrollment_status_enum" NOT NULL DEFAULT 'enable', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "type" "enrollment_type_enum" NOT NULL DEFAULT 'student', "id_person" integer, CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_8cd0fb203a776f4f9315b147822" FOREIGN KEY ("id_faculty") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_f4c70536d6aa7f900065f0651d4" FOREIGN KEY ("id_school") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" ADD CONSTRAINT "FK_f8dc70d0cc95931e53e981102fa" FOREIGN KEY ("id_section") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" ADD CONSTRAINT "FK_c45a8b7e397854ff21d39baff33" FOREIGN KEY ("id_enrollment") REFERENCES "enrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_274b7e873bd3cdb79b1ba59d4af" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_274b7e873bd3cdb79b1ba59d4af"`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" DROP CONSTRAINT "FK_c45a8b7e397854ff21d39baff33"`);
        await queryRunner.query(`ALTER TABLE "section_enrollment" DROP CONSTRAINT "FK_f8dc70d0cc95931e53e981102fa"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_f4c70536d6aa7f900065f0651d4"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_8cd0fb203a776f4f9315b147822"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`DROP TABLE "section_enrollment"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TABLE "faculty"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
