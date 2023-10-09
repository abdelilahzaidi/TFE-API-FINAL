import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelEntity } from 'src/commun/entities/level/level';
import { CreateLevelDto } from 'src/commun/dto/level/level-create.dto';

@Controller('level')
export class LevelController {
    constructor(
        private readonly levelService: LevelService,
        
      ) {}
      @Get()
      async all():Promise<LevelEntity[]>{
        return await this.levelService.all()
        
      }
    
      @Post()
      async create(@Body() dto : CreateLevelDto): Promise<LevelEntity> {
        console.log(dto)
        return await this.levelService.createLevel(dto);
      }

      @Delete(':id')
      async delete(@Param('id') id: number) {
        return await this.levelService.delete(id);
      }
}
