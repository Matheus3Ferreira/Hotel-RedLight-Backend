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
import { Hospede } from "./Hospede";
import { Quarto } from "./Quarto";

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    idReserva: string;

    @Column()
    idHospede: number;

    @ManyToOne(type => Hospede, reservas => Reserva, { eager: true })
    @JoinColumn({name: "idHospede"})
    hospede: Hospede;

    @OneToMany(type => Quarto, reserva => Reserva)
    quartos: Quarto[];

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
