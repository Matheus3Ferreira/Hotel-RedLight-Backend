import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Reserva } from "./Reserva";

export enum UserStatus {
    ACTIVE = "active",
    PENDING = "pending",
}

@Entity()
export class Hospede {

    @PrimaryGeneratedColumn()
    idHospede: number;

    @OneToMany(type => Reserva, reserva => reserva.hospede)
    reservas: Reserva[];

    @Column()
    nome: string;
    
    @Column()
    email: string;
    
    @Column()
    senha: string;

    @Column()
    telefone: string;
    
    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
