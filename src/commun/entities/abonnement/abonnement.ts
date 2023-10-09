import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../user/user";
import { FactureEntity } from "../facture/facture";
import { TypeAbonnementEntity } from "../typeAbonnement/typeAbonnemnt";


@Entity('abonnement')
export class AbonnementEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    dateDebut :Date;

    @Column()
    dateFin :Date

    @ManyToOne(() => UserEntity, (user) => user.abonnements)
  user: UserEntity; 

  @OneToMany(() => FactureEntity, (facture) => facture.abonnement)
  factures: FactureEntity[];

  @ManyToOne(() => TypeAbonnementEntity, (typeAbonnement) => typeAbonnement.abonnements)
  typeAbonnement: TypeAbonnementEntity;

}