import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,

} from "typeorm";
import { Comodidade } from "./Comodidade";

@Entity()
export class Quarto {

    @PrimaryGeneratedColumn()
    numeroQuarto: number;

    @ManyToMany(() => Comodidade)
    @JoinTable()
    comodidades: Comodidade;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column("decimal", { scale: 2 })
    valorDiaria: number;
    
    @Column({ default: true })
    disponivel: Boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
