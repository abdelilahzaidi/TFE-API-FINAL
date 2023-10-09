import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LevelEntity } from "../level/level";

@Entity('program')
export class ProgramEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    title : string;
    @Column()
    contenu : string;   
    @OneToOne(() => LevelEntity, level => level.program)
    level: LevelEntity; 

    active: boolean = true
}