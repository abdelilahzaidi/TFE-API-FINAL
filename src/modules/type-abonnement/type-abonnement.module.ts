import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAbonnementEntity } from 'src/commun/entities/typeAbonnement/typeAbonnemnt';

@Module({
    imports:[
        TypeOrmModule.forFeature([TypeAbonnementEntity]),
        
      ],
      providers: [],
      controllers: [],
      exports:[]
})
export class TypeAbonnementModule {}
