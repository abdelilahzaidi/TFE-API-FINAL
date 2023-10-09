import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SeanceEntity } from "../seance/seance";

@Entity('datecour')
export class DateCourEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    dateCour: Date;

    @OneToMany(() => SeanceEntity, (seance) => seance.dateCour)
    seances: SeanceEntity[]; 
    
}