import {MigrationInterface, QueryRunner} from "typeorm";

export class FKQuartoComodidade1636754799076 implements MigrationInterface {
    name = 'FKQuartoComodidade1636754799076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
    }

}
