import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactureEntity } from 'src/commun/entities/facture/facture';


@Module({
    imports:[
        TypeOrmModule.forFeature([FactureEntity]),
        
      ],
      providers: [],
      controllers: [],
      exports:[]
})
export class FactureModule {}
