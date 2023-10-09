import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LieuEntity } from "../lieu/lieu";
import { SeanceEntity } from "../seance/seance";

@Entity('cour')
export class CourEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    objectifDuCour: string;

   
    @ManyToOne(() => LieuEntity, lieu => lieu.id, { nullable: true })
    lieu: LieuEntity;

    @OneToMany(() => SeanceEntity, (seance) => seance.cour)
    seances: SeanceEntity[];

}