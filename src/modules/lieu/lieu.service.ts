import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLieuDto } from 'src/commun/dto/lieu/lieu-create.dto';
import { LieuEntity } from 'src/commun/entities/lieu/lieu';
import { Repository } from 'typeorm';

@Injectable()
export class LieuService {
  constructor(
    @InjectRepository(LieuEntity)
    private readonly lieuRepository: Repository<LieuEntity>,
  ) {}

  async all(): Promise<LieuEntity[]> {
    return await this.lieuRepository.find();
  }


  async createLieu(dto: CreateLieuDto): Promise<LieuEntity> {
    try {
      const lieu = new LieuEntity();
      lieu.rue = dto.rue;
      lieu.commune = dto.commune;
      lieu.ville = dto.ville;


      const savedLieu = await this.lieuRepository.save(lieu);


      console.log('in service', savedLieu);
      return savedLieu;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Une erreur est survenue lors de la création du lieu.',
      );
    }
  }
  async findLieuById(id: number): Promise<LieuEntity | undefined> {
    return this.lieuRepository.findOne({ where: { id } });
  }
}
