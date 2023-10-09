import { Body, Controller,Get, Post } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceEntity } from 'src/commun/entities/seance/seance';
import { SeanceCreateDTO } from 'src/commun/dto/seance/seance-create.dto';

@Controller('seance')
export class SeanceController {
    constructor(
        private readonly seanceService: SeanceService,
        
      ) {}
      @Get()
      async all():Promise<SeanceEntity[]>{
        return await this.seanceService.getAllSeances()        
      }
    
      @Post()
      async create(@Body() dto : SeanceCreateDTO): Promise<SeanceEntity> {
        console.log(dto)
        return await this.seanceService.createSeance(dto);
      }

      //à corriger
      // @Get([':id/participants'])
      // async getNbParticipants(@Param('id') id: number) {
      //   const seance = await this.seanceService.findOne({
      //     where: { id },
      //     relations: ['participants'],
      //   });
    
      //   return { nb: seance.participants.length };
      // }
}
