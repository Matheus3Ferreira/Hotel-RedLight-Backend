import {MigrationInterface, QueryRunner} from "typeorm";

export class FKContaConsumo1637627317777 implements MigrationInterface {
    name = 'FKContaConsumo1637627317777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conta_consumos_consumo" ("contaIdConta" integer NOT NULL, "consumoIdConsumo" integer NOT NULL, CONSTRAINT "PK_9454387245beaac7b3f0a276d62" PRIMARY KEY ("contaIdConta", "consumoIdConsumo"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cdceb4d07b1e7dd305166f28c7" ON "conta_consumos_consumo" ("contaIdConta") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0803d781bb7a3ce141a383f23" ON "conta_consumos_consumo" ("consumoIdConsumo") `);
        await queryRunner.query(`ALTER TABLE "conta_consumos_consumo" ADD CONSTRAINT "FK_cdceb4d07b1e7dd305166f28c7c" FOREIGN KEY ("contaIdConta") REFERENCES "conta"("idConta") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conta_consumos_consumo" ADD CONSTRAINT "FK_f0803d781bb7a3ce141a383f230" FOREIGN KEY ("consumoIdConsumo") REFERENCES "consumo"("idConsumo") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conta_consumos_consumo" DROP CONSTRAINT "FK_f0803d781bb7a3ce141a383f230"`);
        await queryRunner.query(`ALTER TABLE "conta_consumos_consumo" DROP CONSTRAINT "FK_cdceb4d07b1e7dd305166f28c7c"`);
        await queryRunner.query(`DROP INDEX "IDX_f0803d781bb7a3ce141a383f23"`);
        await queryRunner.query(`DROP INDEX "IDX_cdceb4d07b1e7dd305166f28c7"`);
        await queryRunner.query(`DROP TABLE "conta_consumos_consumo"`);
    }

}
