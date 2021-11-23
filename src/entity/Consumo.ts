import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Servico } from "./Servico";

@Entity()
export class Consumo {

    @PrimaryGeneratedColumn()
    idConsumo: number;
    
    @Column()
    idServico: number;
    
    @JoinColumn({name: "idServico"})
    @ManyToOne(type => Servico, consumos => Consumo, {eager: true})
    servico: Servico;
    
    @Column()
    quantidade: number;

    @Column("float", {scale: 2})
    valorTotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
