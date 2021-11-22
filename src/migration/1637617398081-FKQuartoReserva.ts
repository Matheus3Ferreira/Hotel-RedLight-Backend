import {MigrationInterface, QueryRunner} from "typeorm";

export class FKQuartoReserva1637617398081 implements MigrationInterface {
    name = 'FKQuartoReserva1637617398081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP CONSTRAINT "FK_a66d7f274cfd882353d5c37777a"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" RENAME COLUMN "reservaIdReserva" TO "idReserva"`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD CONSTRAINT "FK_df0b56571e9bbc82c3970db8809" FOREIGN KEY ("idReserva") REFERENCES "reserva"("idReserva") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP CONSTRAINT "FK_df0b56571e9bbc82c3970db8809"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ALTER COLUMN "valorDiaria" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."ocupacao" ALTER COLUMN "salario" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" RENAME COLUMN "idReserva" TO "reservaIdReserva"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD CONSTRAINT "FK_a66d7f274cfd882353d5c37777a" FOREIGN KEY ("reservaIdReserva") REFERENCES "reserva"("idReserva") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
