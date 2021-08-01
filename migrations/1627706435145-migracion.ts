import {MigrationInterface, QueryRunner} from "typeorm";

export class migracion1627706435145 implements MigrationInterface {
    name = 'migracion1627706435145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enrollment_section" ("id_enrollment" integer NOT NULL, "id_section" integer NOT NULL, CONSTRAINT "PK_166d1a4f4e5cb034d500ef27dcb" PRIMARY KEY ("id_enrollment", "id_section"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a102ffe4c18b845b57a2a9c36" ON "enrollment_section" ("id_enrollment") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc0588f52538623f3d91fbd659" ON "enrollment_section" ("id_section") `);
        await queryRunner.query(`ALTER TABLE "enrollment_section" ADD CONSTRAINT "FK_5a102ffe4c18b845b57a2a9c36f" FOREIGN KEY ("id_enrollment") REFERENCES "enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrollment_section" ADD CONSTRAINT "FK_dc0588f52538623f3d91fbd659a" FOREIGN KEY ("id_section") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollment_section" DROP CONSTRAINT "FK_dc0588f52538623f3d91fbd659a"`);
        await queryRunner.query(`ALTER TABLE "enrollment_section" DROP CONSTRAINT "FK_5a102ffe4c18b845b57a2a9c36f"`);
        await queryRunner.query(`DROP INDEX "IDX_dc0588f52538623f3d91fbd659"`);
        await queryRunner.query(`DROP INDEX "IDX_5a102ffe4c18b845b57a2a9c36"`);
        await queryRunner.query(`DROP TABLE "enrollment_section"`);
    }

}
