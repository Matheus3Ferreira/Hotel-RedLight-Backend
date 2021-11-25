import {MigrationInterface, QueryRunner} from "typeorm";

export class dropFKQuartoReserva1637879264498 implements MigrationInterface {
    name = 'dropFKQuartoReserva1637879264498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP CONSTRAINT "FK_df0b56571e9bbc82c3970db8809"`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP COLUMN "idReserva"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD "idReserva" integer`);
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD CONSTRAINT "FK_df0b56571e9bbc82c3970db8809" FOREIGN KEY ("idReserva") REFERENCES "reserva"("idReserva") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
