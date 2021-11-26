import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,

} from "typeorm";
import { Hospede } from "./Hospede";
import { Quarto } from "./Quarto";

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    idReserva: number;

    @Column()
    idHospede: number;

    @ManyToOne(type => Hospede, hospede => hospede.reservas, { eager: true})
    @JoinColumn({name: "idHospede"})
    hospede: Hospede;

    @ManyToMany(type => Quarto)
    @JoinTable()
    quartos: Quarto[];

    @Column()
    adultos: number;
    
    @Column({default: 0})
    criancas: number;

    @Column({
        default: false
    })
    checado: Boolean;

    @Column({nullable: true})
    protocolo: string;
    
    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
