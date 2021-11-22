import {MigrationInterface, QueryRunner} from "typeorm";

export class FKConsumoServico1637622304639 implements MigrationInterface {
    name = 'FKConsumoServico1637622304639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consumo" ("idConsumo" SERIAL NOT NULL, "idServico" integer NOT NULL, "quantidade" integer NOT NULL, "valorTotal" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5dabfd2a4a44fc897cf38fc5b70" PRIMARY KEY ("idConsumo"))`);
        await queryRunner.query(`ALTER TABLE "public"."servico" ALTER COLUMN "valor" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "consumo" ADD CONSTRAINT "FK_8fef62285dda5d4a636c570ddea" FOREIGN KEY ("idServico") REFERENCES "servico"("idServico") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumo" DROP CONSTRAINT "FK_8fef62285dda5d4a636c570ddea"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."servico" ALTER COLUMN "valor" TYPE numeric`);
        await queryRunner.query(`DROP TABLE "consumo"`);
    }

}
