import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnImagemQuarto1637718590238 implements MigrationInterface {
    name = 'ColumnImagemQuarto1637718590238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" ADD "imagem" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."quarto" DROP COLUMN "imagem"`);
    }

}
