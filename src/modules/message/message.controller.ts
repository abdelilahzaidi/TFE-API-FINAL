import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/commun/dto/message/create-message.dto';
import { MessageEntity } from 'src/commun/entities/message/message';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto): Promise<MessageEntity> {
      console.log("create message",createMessageDto)
      return await this.messageService.createMessage(createMessageDto);
    }
  
    @Get()
    async findAll(): Promise<MessageEntity[]> {
      return await this.messageService.getMessages();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MessageEntity> {
      return await this.messageService.getMessageById(+id);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return await this.messageService.deleteMessage(+id);
    }

}
