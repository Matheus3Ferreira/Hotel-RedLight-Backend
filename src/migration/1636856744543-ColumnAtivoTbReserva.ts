import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnAtivoTbReserva1636856744543 implements MigrationInterface {
    name = 'ColumnAtivoTbReserva1636856744543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."reserva" ADD "ativo" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."reserva" DROP COLUMN "ativo"`);
    }

}
