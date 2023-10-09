import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateCourEntity } from 'src/commun/entities/dateCour/dateCour';
import { DateCourService } from './date-cour.service';
import { DateCourController } from './date-cour.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([DateCourEntity]),
        
      ],
      providers: [DateCourService],
      controllers: [DateCourController],
      exports:[DateCourService]
})
export class DateCourModule {}
