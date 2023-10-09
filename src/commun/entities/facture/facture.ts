import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AbonnementEntity } from "../abonnement/abonnement";



@Entity('facture')
export class FactureEntity{
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    dateEnvoie : Date;
    @Column()
    etatDePaiement :  boolean; 
    @Column({type:'decimal',precision:5,scale:2})
    montant:number;   
    @ManyToOne(() => AbonnementEntity, (abonnement) => abonnement.factures)
    abonnement: AbonnementEntity;
        
}