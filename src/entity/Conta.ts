import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Servico } from "./Servico";

@Entity()
export class Conta {

    @PrimaryGeneratedColumn()
    idConta: string;

    @OneToMany(type => Servico, conta => Conta, { eager: true })
    servicos: Servico[];

    @Column()
    data: Date;

    @Column("decimal")
    valorTotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
