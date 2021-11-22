import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnValorTBServico1637619156120 implements MigrationInterface {
    name = 'ColumnValorTBServico1637619156120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."servico" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."servico" DROP COLUMN "valor"`);
    }

}
