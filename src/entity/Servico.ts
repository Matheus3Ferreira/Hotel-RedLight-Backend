import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Conta } from "./Conta";
import { Funcionario } from "./Funcionario";

@Entity()
export class Servico {

    @PrimaryGeneratedColumn()
    idServico: string;

    // @ManyToOne(() => Conta, servicos => servicos)
    // conta: Conta;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
