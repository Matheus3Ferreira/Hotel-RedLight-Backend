import {MigrationInterface, QueryRunner} from "typeorm";

export class FKQuartoReserva1636995418408 implements MigrationInterface {
    name = 'FKQuartoReserva1636995418408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD "idReserva" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD CONSTRAINT "FK_df0b56571e9bbc82c3970db8809" FOREIGN KEY ("idReserva") REFERENCES "reserva"("idReserva") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP CONSTRAINT "FK_df0b56571e9bbc82c3970db8809"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP COLUMN "idReserva"`);
    }

}
