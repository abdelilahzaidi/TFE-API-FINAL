import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';

@Module({
    imports:[
        TypeOrmModule.forFeature([AbonnementEntity]),
        
      ],
      providers: [],
      controllers: [],
      exports:[]
})
export class AbonnementModule {}
