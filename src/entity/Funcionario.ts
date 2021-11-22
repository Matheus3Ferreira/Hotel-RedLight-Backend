import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";

import { Ocupacao } from './Ocupacao'

@Entity()
export class Funcionario {

    @PrimaryGeneratedColumn()
    idFuncionario: number;

    @Column()
    idOcupacao: number;

    @JoinColumn({ name: "idOcupacao" })
    @ManyToOne(type => Ocupacao, funcionarios => Funcionario, { eager: true })
    ocupacao: Ocupacao;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
