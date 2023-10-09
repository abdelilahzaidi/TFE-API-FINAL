import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SeanceEntity } from '../seance/seance';

export type DayOfWeek = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

@Entity('horaire')
export class HoraireEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : 'time'})
  heureDebut: Date;
  @Column({type : 'time'})
  heureFin: Date;
  @Column()
  jour: DayOfWeek;
  @OneToMany(() => SeanceEntity, (seance) => seance.horaire)
  seances: SeanceEntity[];
}
