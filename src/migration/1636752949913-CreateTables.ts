import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1636752949913 implements MigrationInterface {
    name = 'CreateTables1636752949913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comodidade" ("idComodidade" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a64d466839ee6002e1c9d07c896" PRIMARY KEY ("idComodidade"))`);
        await queryRunner.query(`CREATE TABLE "conta" ("idConta" SERIAL NOT NULL, "data" TIMESTAMP NOT NULL, "valorTotal" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb70757a3cb82b82d8444947377" PRIMARY KEY ("idConta"))`);
        await queryRunner.query(`CREATE TABLE "funcionario" ("idFuncionario" SERIAL NOT NULL, "idOcupacao" integer NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "telefone" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_afd1547ac3837affc17312b2789" PRIMARY KEY ("idFuncionario"))`);
        await queryRunner.query(`CREATE TABLE "hospede" ("idHospede" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "telefone" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7bf1934ad9fbe4cbefc1dfe9c1b" PRIMARY KEY ("idHospede"))`);
        await queryRunner.query(`CREATE TABLE "ocupacao" ("idOcupacao" SERIAL NOT NULL, "nome" character varying NOT NULL, "salario" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7a80488d274fc6a7d9c6ef8bd8f" PRIMARY KEY ("idOcupacao"))`);
        await queryRunner.query(`CREATE TABLE "quarto" ("idQuarto" SERIAL NOT NULL, "nome" character varying NOT NULL, "tipo" character varying NOT NULL, "valorDiaria" numeric NOT NULL, "telefone" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f6480aab5b0d0459e673da2e3a5" PRIMARY KEY ("idQuarto"))`);
        await queryRunner.query(`CREATE TABLE "reserva" ("idReserva" SERIAL NOT NULL, "adultos" integer NOT NULL, "criancas" integer NOT NULL, "checkIn" TIMESTAMP NOT NULL, "checkOut" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd0e1407fbd81f816dfa262f4cc" PRIMARY KEY ("idReserva"))`);
        await queryRunner.query(`CREATE TABLE "servico" ("idServico" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b50eceed44e2eabdd0878fca96f" PRIMARY KEY ("idServico"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "servico"`);
        await queryRunner.query(`DROP TABLE "reserva"`);
        await queryRunner.query(`DROP TABLE "quarto"`);
        await queryRunner.query(`DROP TABLE "ocupacao"`);
        await queryRunner.query(`DROP TABLE "hospede"`);
        await queryRunner.query(`DROP TABLE "funcionario"`);
        await queryRunner.query(`DROP TABLE "conta"`);
        await queryRunner.query(`DROP TABLE "comodidade"`);
    }

}
