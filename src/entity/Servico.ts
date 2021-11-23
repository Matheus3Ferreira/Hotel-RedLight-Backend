import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Consumo } from "./Consumo";

@Entity()
export class Servico {

    @PrimaryGeneratedColumn()
    idServico: number;

    @OneToMany(type => Consumo, servico => Servico)
    consumos: Consumo[];

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column("float", { scale: 2 })
    valor: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
