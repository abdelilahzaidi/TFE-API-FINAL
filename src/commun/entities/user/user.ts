// user.entity.ts
import { Exclude } from 'class-transformer';
import { UserGender } from 'src/commun/enums/gender.enum';
import { UserStatus } from 'src/commun/enums/status.enum';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LevelEntity } from '../level/level';
import { MessageEntity } from '../message/message';
import { SeanceEntity } from '../seance/seance';
import { AbonnementEntity } from '../abonnement/abonnement';
import { SeanceUserEntity } from '../seance_user/seance-user';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
  gender: UserGender;

  @Column()
  birthDate: Date;

  @Column()
  rue: string;

  @Column()
  commune: string;

  @Column()
  ville: string;

  @Column({ default: true })
  actif: boolean;

  @Column()
  attributionDate: Date;

  @Column()
  gsm: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.MEMBER })
  status: UserStatus;

  @ManyToOne(() => LevelEntity, (level) => level.users, { nullable: true })
  level: LevelEntity;

  @ManyToMany(() => MessageEntity, (message) => message.receivers)
  @JoinTable({
    name: 'message_user',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'messageId',
      referencedColumnName: 'id',
    },
  })
  receivedMessages?: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  sentMessages?: MessageEntity[];

  // @ManyToMany(() => SeanceEntity, (seance) => seance.users)
  // @JoinTable({
  //   name: 'user_seance',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'seance_id', referencedColumnName: 'id' },
  // })
  // seances: SeanceEntity[];

  @OneToMany(() => SeanceUserEntity, (seanceUser) => seanceUser.user)
  seanceUsers?: SeanceUserEntity[];

  @OneToMany(() => AbonnementEntity, (abonnement) => abonnement.user)
  abonnements?: AbonnementEntity[];
}
