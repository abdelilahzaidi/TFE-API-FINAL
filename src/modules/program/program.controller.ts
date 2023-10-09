import { Body, Controller, Get, Post,Delete, Param } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramEntity } from 'src/commun/entities/program/program';
import { ProgramCreateDTO } from 'src/commun/dto/program/program-create.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}
  @Get()
  async all(): Promise<ProgramEntity[]> {
    return await this.programService.all();
  }
  @Post()
  async create(@Body() dto : ProgramCreateDTO):Promise<ProgramEntity>{
    return await this.programService.createProgram(dto)
  }

  @Delete(":id")
  async delete( @Param("id") id: number):Promise<ProgramEntity>{
    return await this.programService.delete(id)
  }
}

   