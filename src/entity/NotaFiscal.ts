import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Hospede } from "./Hospede";

@Entity('notaFiscal')
export class NotaFiscal {

    @PrimaryGeneratedColumn()
    idNotaFiscal: string;
    
    @ManyToOne(type => Hospede, notasFiscais => NotaFiscal)
    hospede: Hospede;    

    @Column()
    dataEmissao: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
