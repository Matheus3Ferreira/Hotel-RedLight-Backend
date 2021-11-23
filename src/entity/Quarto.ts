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
import { Comodidade } from "./Comodidade";
import { Reserva } from "./Reserva";

@Entity()
export class Quarto {

    @PrimaryGeneratedColumn()
    numeroQuarto: number;

    @Column({nullable: true})
    idReserva: number;

    @ManyToMany(() => Comodidade)
    @JoinTable()
    comodidades: Comodidade;

    @ManyToOne(type => Reserva, quartos => Quarto)
    @JoinColumn({name: "idReserva"})
    reserva: Reserva;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column("float", { scale: 2 })
    valorDiaria: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
