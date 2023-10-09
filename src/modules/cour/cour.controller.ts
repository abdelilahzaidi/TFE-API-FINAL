import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourEntity } from 'src/commun/entities/cour/cour';
import { CourService } from './cour.service';
import { CreateCourDTO } from 'src/commun/dto/cour/cour-create.dto';


@Controller('cour')
export class CourController {
    constructor(
        private readonly courService : CourService
    ){}

    @Get()
    async all():Promise<CourEntity[]>{
        return await this.courService.all()
    }

    @Post()
    async create(@Body() dto : CreateCourDTO): Promise<CourEntity> {
      console.log(dto)
      return await this.courService.createCour(dto);
    }
}
