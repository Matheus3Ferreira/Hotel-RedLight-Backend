import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,

} from "typeorm";
import { Conta } from "./Conta";
import { Hospede } from "./Hospede";
import { Quarto } from "./Quarto";

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    idReserva: number;

    @Column()
    idHospede: number;

    @ManyToOne(type => Hospede, reservas => Reserva, { eager: true })
    @JoinColumn({name: "idHospede"})
    hospede: Hospede;

    @OneToMany(type => Quarto, reserva => Reserva)
    quartos: Quarto[];

    @OneToMany(type => Conta, reserva => Reserva)
    contas: Conta[];

    @Column()
    adultos: number;
    
    @Column({default: 0})
    criancas: number;
    
    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @Column({default: true})
    ativo: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
