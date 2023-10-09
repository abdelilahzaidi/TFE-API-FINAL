import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';1
import { UserEntity } from 'src/commun/entities/user/user';
import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/commun/entities/message/message';
import { Repository } from 'typeorm';
import { UserSeanceDTO } from 'src/commun/dto/user/user-seance.dto';
import { StatusGuard } from 'src/shared/security/status.guard';
import { Status } from 'src/shared/security/status.decorator';
import { UserStatus } from 'src/commun/enums/status.enum';
import { ProgramEntity } from 'src/commun/entities/program/program';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService,
        @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
        @InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>
    ){}
    @Get()
    async all():Promise<UserEntity[]>{
        
        return await this.userService.all()
    }
    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Post()
    async createUser(@Body() dto : UserCreateDTO):Promise<UserEntity>{        
        console.log('DTO in controler ',dto)
       return  await this.userService.createUser(dto);
    }
    @Get(':id')
    async getById(@Param('id') id: number){
        return this.userService.findOneById(id)
    }
    @Get(":id/message")
    async getUserMessageByid(@Param('id') id: number) {
        const user: UserEntity = await this.userService.findOneById(id)

        console.log(user)
        const messages = await user.receivedMessages;
        console.log(messages)
        return messages
    }
    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Delete(':id')   
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body
    ) {
        const { ...data} = body;
        
        await this.userService.update(id, {
            ...data,
           
        });

        return this.userService.findOneById(id);
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.RESPONSABLE)
    @Put('participate/:id')
    async updateParticipation(@Body() dto :UserSeanceDTO,id :number){
        return await this.userService.updateParticipeSeance(id, dto.presence)
        
    }

    @Get(":id/program")
    async getProgramByUserId(
        @Param("id") id: number
    ) {
        return (await this.userService.findProgram(id)).level.program
    }

    

    
  
    
}
