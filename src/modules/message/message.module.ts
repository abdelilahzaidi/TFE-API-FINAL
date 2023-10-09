import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/commun/entities/message/message';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserEntity } from 'src/commun/entities/user/user';


@Module({
    imports:[
        TypeOrmModule.forFeature([MessageEntity,UserEntity]),
        
      ],
      providers: [MessageService],
      controllers: [MessageController],
      exports:[MessageService]
})
export class MessageModule {}
