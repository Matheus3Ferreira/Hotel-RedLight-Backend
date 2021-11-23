import {MigrationInterface, QueryRunner} from "typeorm";

export class FKContaReserva1637628700173 implements MigrationInterface {
    name = 'FKContaReserva1637628700173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."conta" ADD "idReserva" integer`);
        await queryRunner.query(`ALTER TABLE "public"."conta" ADD CONSTRAINT "FK_db1724834b42e1a6c23a12e494a" FOREIGN KEY ("idReserva") REFERENCES "reserva"("idReserva") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."conta" DROP CONSTRAINT "FK_db1724834b42e1a6c23a12e494a"`);
        await queryRunner.query(`ALTER TABLE "public"."conta" DROP COLUMN "idReserva"`);
    }

}
