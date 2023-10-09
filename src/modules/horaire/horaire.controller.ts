import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateHoraireDto } from 'src/commun/dto/horaire/create-horaire.dto';
import { HoraireService } from './horaire.service';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { UserStatus } from 'src/commun/enums/status.enum';
import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';

@Controller('horaire')
export class HoraireController {
    constructor(
        private readonly horaireService : HoraireService
    ){}

    @Get()
    async all():Promise<HoraireEntity[]>{
        return await this.horaireService.all()
    }
    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Post()
    async create(@Body() dto : CreateHoraireDto): Promise<HoraireEntity> {
      console.log(dto)
      return await this.horaireService.createHoraire(dto);
    }

    @Get(':id')
    async getLieuById(@Param('id') id: number){
        return this.horaireService.findHoraireById(id)
    }
}
