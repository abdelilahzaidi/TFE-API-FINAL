import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { HoraireService } from './horaire.service';
import { HoraireController } from './horaire.controller';
import { StatusGuard } from 'src/shared/security/status.guard';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HoraireEntity,UserEntity]), 
    forwardRef(()=>UserModule)    
  ],
  providers: [HoraireService, StatusGuard],
  controllers: [HoraireController],
  exports: [HoraireService],
})
export class HoraireModule {}
