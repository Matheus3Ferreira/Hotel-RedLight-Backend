import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,

} from "typeorm";
import { Hospede } from "./Hospede";

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    idReserva: string;

    @Column()
    idHospede: number;

    @ManyToOne(type => Hospede, reservas => Reserva, { eager: true})
    @JoinColumn({name: "idHospede"})
    hospede: Hospede;

    @Column()
    adultos: number;
    
    @Column()
    criancas: number;
    
    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
