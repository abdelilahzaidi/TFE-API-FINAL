import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/commun/entities/user/user';
import { LevelModule } from '../level/level.module';
import { MessageEntity } from 'src/commun/entities/message/message';
import { SeanceEntity } from 'src/commun/entities/seance/seance';
import { SeanceModule } from '../seance/seance.module';
import { SeanceUserEntity } from 'src/commun/entities/seance_user/seance-user';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { HoraireModule } from '../horaire/horaire.module';
import { ProgramEntity } from 'src/commun/entities/program/program';



@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, MessageEntity,SeanceEntity,SeanceUserEntity,HoraireEntity, ProgramEntity]),   
    forwardRef(() => LevelModule),
    forwardRef(()=> HoraireModule),
    SeanceModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
