import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/commun/dto/message/create-message.dto';
import { MessageEntity } from 'src/commun/entities/message/message';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/commun/entities/user/user';


@Injectable()
export class MessageService {

    constructor(
      @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
      @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
      ) {}

      
      async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const { titre, contenu, receivers, senderId } = createMessageDto;

 
    const sender = await this.userRepository.findOne({where:{id:senderId}});

    if (!sender) {
      throw new NotFoundException(`User with id ${senderId} not found`);
    }


    const message = this.messageRepository.create({
      titre,
      contenu,
      dateHeureEnvoie :new Date(),
      receivers: receivers.map(receiverId => ({ id: receiverId })),
      sender: sender,
    });

 
    return await this.messageRepository.save(message);
  }

    
    
      async getMessages(): Promise<MessageEntity[]> {
        return await this.messageRepository.find();
      }
    
      async getMessageById(id: number): Promise<MessageEntity> {
        const message = await this.messageRepository.findOne({where: { id }});
        console.log('message',message)
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        return message;
      } 
    
      async deleteMessage(id: number): Promise<void> {
        const message = await this.messageRepository.findOne({where: { id }});
        if (!message) {
          throw new NotFoundException(`Message with id ${id} not found`);
        }
        await this.messageRepository.remove(message);
      }
}
