import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDto } from 'src/commun/dto/level/level-create.dto';
import { LevelEntity } from 'src/commun/entities/level/level';
import { Repository } from 'typeorm';
import { ProgramService } from '../program/program.service';


@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
    private programService: ProgramService,
  ) {}

  async all(): Promise<LevelEntity[]> {
    return await this.levelRepository.find();
  }

  async createLevel(dto: CreateLevelDto): Promise<LevelEntity> {
    try {
      const levelFound = await this.findLevelByGrade(dto.grade);
      if (levelFound) {
        throw new ConflictException('Ce level existe déjà.');
      }
      const program = await this.programService.findProgramById(dto.programId); // Récupérez le programme associé

      const level = new LevelEntity();
      level.grade = dto.grade;
      level.program = program; // Associez le programme au niveau

      const savedLevel = await this.levelRepository.save(level);

      console.log('in service', savedLevel);
      return savedLevel;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Une erreur est survenue lors de la création du level.',
      );
    }
  }
  async findLevelById(id: number): Promise<LevelEntity | undefined> {
    return this.levelRepository.findOne({ where: { id } });
  }

  async findLevelByGrade(grade: string): Promise<LevelEntity | undefined> {
    return this.levelRepository.findOne({ where: { grade } });
  }
  async update(id: number, data): Promise<any> {
    return this.levelRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.levelRepository.delete(id);
  }
}
