import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity()
export class Ocupacao {

    @PrimaryGeneratedColumn()
    idOcupacao: number;

    @OneToMany(type => Funcionario, ocupacao => Ocupacao)
    funcionarios: Funcionario[];

    @Column()
    nome: string;
 
    @Column("float", {scale: 2})
    salario: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
