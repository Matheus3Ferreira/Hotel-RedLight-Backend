import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Consumo } from "./Consumo";
import { Reserva } from "./Reserva";

@Entity()
export class Conta {

    @PrimaryGeneratedColumn()
    idConta: number;

    @Column({nullable: true})
    idReserva: number;

    @ManyToMany(() => Consumo)
    @JoinTable()
    consumos: Consumo;
    
    @JoinColumn({name: "idReserva"})
    @ManyToOne(type => Reserva, contas => Conta)
    reserva: Reserva;

    @Column()
    data: Date;

    @Column("float")
    valorTotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
