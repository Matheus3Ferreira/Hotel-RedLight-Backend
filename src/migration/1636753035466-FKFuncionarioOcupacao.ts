import {MigrationInterface, QueryRunner} from "typeorm";

export class FKFuncionarioOcupacao1636753035466 implements MigrationInterface {
    name = 'FKFuncionarioOcupacao1636753035466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."funcionario" ADD CONSTRAINT "FK_df752115ad61f984b6f8d169abd" FOREIGN KEY ("idOcupacao") REFERENCES "ocupacao"("idOcupacao") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."funcionario" DROP CONSTRAINT "FK_df752115ad61f984b6f8d169abd"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
    }

}
