import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/commun/entities/level/level';
import { ProgramModule } from '../program/program.module';

@Module({
  imports:[TypeOrmModule.forFeature([LevelEntity]),ProgramModule],
  providers: [LevelService],
  controllers: [LevelController],
  exports:[LevelService]
})
export class LevelModule {}
