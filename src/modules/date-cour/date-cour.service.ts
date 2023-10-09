import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateCourEntity } from 'src/commun/entities/dateCour/dateCour';
import { Repository } from 'typeorm';
import { SeanceService } from '../seance/seance.service';
import { CreateDateCourDTO } from 'src/commun/dto/dateCour/date-cour-create.dto';


@Injectable()
export class DateCourService {
    constructor(
        @InjectRepository(DateCourEntity)
        private dateCourRepository: Repository<DateCourEntity>        
      ) {}
    
      async all(): Promise<DateCourEntity[]> {
        return await this.dateCourRepository.find();
      }

      async createDateCour(dto: CreateDateCourDTO): Promise<DateCourEntity> {
        try {
            const dateCour = new DateCourEntity();
            dateCour.dateCour=dto.dateCour         
                  
     

            const savedDateCour = await this.dateCourRepository.save(dateCour);

            console.log('in service', savedDateCour);
            return savedDateCour;
        } catch (error) {
          throw new InternalServerErrorException(
            error,
            "Une erreur est survenue lors de la création du niveau.",
          );
        }
    }    
    async findDateCourById(id : number): Promise<DateCourEntity | undefined> {
      return this.dateCourRepository.findOne({ where: { id } });
    }
      async findDateCourByDate(dateCour : Date): Promise<DateCourEntity | undefined> {
        return this.dateCourRepository.findOne({ where: { dateCour } });
      }
}
