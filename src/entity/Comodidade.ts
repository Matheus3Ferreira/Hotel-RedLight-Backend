import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comodidade {

    @PrimaryGeneratedColumn()
    idComodidade: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
