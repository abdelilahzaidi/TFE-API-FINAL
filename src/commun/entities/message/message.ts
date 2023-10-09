import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../user/user';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  contenu: string;
  @Column()
  dateHeureEnvoie : Date

  @ManyToMany(() => UserEntity, (user) => user.receivedMessages)
  @JoinTable({
    name: 'message_user',
    joinColumn: {
      name: 'messageId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  receivers: UserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.sentMessages)
  sender: UserEntity;
}
