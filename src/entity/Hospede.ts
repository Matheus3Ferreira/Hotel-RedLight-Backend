import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { NotaFiscal } from "./NotaFiscal";
import { Reserva } from "./Reserva";

@Entity()
export class Hospede {

    @PrimaryGeneratedColumn()
    idHospede: string;

    @OneToMany(type => Reserva, hospede => Hospede)
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
