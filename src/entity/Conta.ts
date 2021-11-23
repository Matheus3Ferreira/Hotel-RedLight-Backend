import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Consumo } from "./Consumo";

@Entity()
export class Conta {

    @PrimaryGeneratedColumn()
    idConta: number;

    @ManyToMany(() => Consumo)
    @JoinTable()
    consumos: Consumo;
  
    @Column()
    data: Date;

    @Column("float")
    valorTotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
