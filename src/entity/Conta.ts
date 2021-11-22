import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Servico } from "./Servico";

@Entity()
export class Conta {

    @PrimaryGeneratedColumn()
    idConta: number;

    // @OneToMany(() => Servico, conta => Conta, { eager: true })
    // servicos: Servico[];

    @Column()
    data: Date;

    @Column("decimal")
    valorTotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
