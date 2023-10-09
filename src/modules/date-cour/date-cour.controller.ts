import { Body, Param, Controller,Get,Post } from '@nestjs/common';
import { DateCourService } from './date-cour.service';
import { DateCourEntity } from 'src/commun/entities/dateCour/dateCour';
import { CreateDateCourDTO } from 'src/commun/dto/dateCour/date-cour-create.dto';

@Controller('date-cour')
export class DateCourController {
    constructor(
        private readonly dateCourService : DateCourService
    ){}

    @Get()
    async all():Promise<DateCourEntity[]>{
        return await this.dateCourService.all()
    }
    @Post()
    async create(@Body() dto : CreateDateCourDTO): Promise<DateCourEntity> {
      console.log(dto)
      return await this.dateCourService.createDateCour(dto);
    }

    @Get(':id')
    async getLieuById(@Param('id') date : Date){
        return this.dateCourService.findDateCourByDate(date)
    }
}
