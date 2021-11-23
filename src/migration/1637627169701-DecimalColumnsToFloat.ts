import {MigrationInterface, QueryRunner} from "typeorm";

export class DecimalColumnsToFloat1637627169701 implements MigrationInterface {
    name = 'DecimalColumnsToFloat1637627169701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."servico" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "public"."servico" ADD "valor" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."consumo" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "public"."consumo" ADD "valorTotal" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."conta" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "public"."conta" ADD "valorTotal" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ADD "salario" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP COLUMN "valorDiaria"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD "valorDiaria" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP COLUMN "valorDiaria"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD "valorDiaria" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ADD "salario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."conta" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "public"."conta" ADD "valorTotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."consumo" DROP COLUMN "valorTotal"`);
        await queryRunner.query(`ALTER TABLE "public"."consumo" ADD "valorTotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."servico" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "public"."servico" ADD "valor" numeric NOT NULL`);
    }

}
