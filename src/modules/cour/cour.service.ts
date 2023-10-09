
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CourEntity } from 'src/commun/entities/cour/cour';
import { Repository } from 'typeorm';
import { LieuService } from '../lieu/lieu.service';
import { CreateCourDTO } from 'src/commun/dto/cour/cour-create.dto';

@Injectable()
export class CourService {
    constructor(
        @InjectRepository(CourEntity)
        private courRepository: Repository<CourEntity>,
        private lieuService : LieuService
      ) {}
    
      async all(): Promise<CourEntity[]> {
        return await this.courRepository.find();
      }

      async createCour(dto: CreateCourDTO): Promise<CourEntity> {
        try {
            const lieu = await this.lieuService.findLieuById(dto.lieuId); // Récupérez le programme associé
            console.log('lieu',lieu)
            const cour = new CourEntity();
            cour.objectifDuCour=dto.objectifDuCour
            cour.lieu=lieu      
     

            const savedCour = await this.courRepository.save(cour);

            console.log('in service', savedCour);
            return savedCour;
        } catch (error) {
          throw new InternalServerErrorException(
            error,

            "Une erreur est survenue lors de la création du niveau.",

          );
        }
    }    
      async findCourById(id: number): Promise<CourEntity | undefined> {
        return this.courRepository.findOne({ where: { id } });
      }
}
