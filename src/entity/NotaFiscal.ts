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

@Entity('notaFiscal')
export class NotaFiscal {

    @PrimaryGeneratedColumn()
    idNotaFiscal: string;

    @Column()
    idHospede: number;

    @JoinColumn({ name: "idHospede" })
    @ManyToOne(type => Hospede, notasFiscais => NotaFiscal, { eager: true })
    hospede: Hospede;


    @Column()
    dataEmissao: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
