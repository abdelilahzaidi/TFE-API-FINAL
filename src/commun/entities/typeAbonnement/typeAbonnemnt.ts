import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AbonnementEntity } from "../abonnement/abonnement";

@Entity('typeabonnement')
export class TypeAbonnementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  tarif: number;

  @OneToMany(() => AbonnementEntity, (abonnement) => abonnement.typeAbonnement)
  abonnements: AbonnementEntity[];
}


