import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProgramEntity } from 'src/commun/entities/program/program';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramCreateDTO } from 'src/commun/dto/program/program-create.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  async all(): Promise<ProgramEntity[]> {
    return await this.programRepository.find();
  }

  async createProgram(dto: ProgramCreateDTO): Promise<ProgramEntity> {
    try {
      const programFound = await this.findProgramByIdTitle(dto.title);
      if (programFound) {
        throw new ConflictException('Ce programme existe déjà.');
      }

      const program = await this.programRepository.save({
        title: dto.title,
        contenu: dto.contenu,
      });

      return program;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Une erreur est survenue lors de la création du programme.',
      );
    }
  }

  async findProgramById(id: number): Promise<ProgramEntity | undefined> {
    return this.programRepository.findOne({ where: { id } });
  }
  async findProgramByIdTitle(
    title: string,
  ): Promise<ProgramEntity | undefined> {
    return this.programRepository.findOne({ where: { title } });
  }
  
  async delete(id: number): Promise<any> {
    return this.programRepository.delete(id);
  }
}
