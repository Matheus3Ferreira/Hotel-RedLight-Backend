import {MigrationInterface, QueryRunner} from "typeorm";

export class FKReservaQuarto1637879534802 implements MigrationInterface {
    name = 'FKReservaQuarto1637879534802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserva_quartos_quarto" ("reservaIdReserva" integer NOT NULL, "quartoNumeroQuarto" integer NOT NULL, CONSTRAINT "PK_38a5e9aaf8b7acc9890e7c55318" PRIMARY KEY ("reservaIdReserva", "quartoNumeroQuarto"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dccbc191a4c1d60ef7d824d278" ON "reserva_quartos_quarto" ("reservaIdReserva") `);
        await queryRunner.query(`CREATE INDEX "IDX_20643798899e74d2ae1c45b49c" ON "reserva_quartos_quarto" ("quartoNumeroQuarto") `);
        await queryRunner.query(`ALTER TABLE "reserva_quartos_quarto" ADD CONSTRAINT "FK_dccbc191a4c1d60ef7d824d278d" FOREIGN KEY ("reservaIdReserva") REFERENCES "reserva"("idReserva") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reserva_quartos_quarto" ADD CONSTRAINT "FK_20643798899e74d2ae1c45b49ce" FOREIGN KEY ("quartoNumeroQuarto") REFERENCES "quarto"("idQuarto") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserva_quartos_quarto" DROP CONSTRAINT "FK_20643798899e74d2ae1c45b49ce"`);
        await queryRunner.query(`ALTER TABLE "reserva_quartos_quarto" DROP CONSTRAINT "FK_dccbc191a4c1d60ef7d824d278d"`);
        await queryRunner.query(`DROP INDEX "IDX_20643798899e74d2ae1c45b49c"`);
        await queryRunner.query(`DROP INDEX "IDX_dccbc191a4c1d60ef7d824d278"`);
        await queryRunner.query(`DROP TABLE "reserva_quartos_quarto"`);
    }

}
