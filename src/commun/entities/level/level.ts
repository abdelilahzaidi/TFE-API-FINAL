import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user";
import { ProgramEntity } from "../program/program";

@Entity('level')
export class LevelEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    grade: string;   
    @OneToMany(() => UserEntity, user => user.level)
    users?: UserEntity[];
    @OneToOne(() => ProgramEntity)
    @JoinColumn()
    program?: ProgramEntity;
}