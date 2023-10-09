import { SeanceUserEntity } from './../../commun/entities/seance_user/seance-user';
import { SeanceService } from './../seance/seance.service';
import { LevelService } from './../level/level.service';
import { UserEntity } from './../../commun/entities/user/user';
import {

  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from 'src/commun/dto/user/user-create.dto';
import { UserSeanceDTO } from 'src/commun/dto/user/user-seance.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly levelService: LevelService,

    @InjectRepository(SeanceUserEntity)
    private readonly userSeanceRepository : Repository<SeanceUserEntity>,
   private readonly seanceService: SeanceService
  ) {}

  async all(): Promise<UserEntity[]> {
    
    return await this.userRepository.find({select:['id','first_name','last_name','gender','birthDate','attributionDate','rue','commune','ville','actif','gsm','email','status'],relations:['level']});
  }

  async createUser(dto: UserCreateDTO): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash('Zah14$01471983', 12);
    try {

      const level = await this.levelService.findLevelById(dto.grade);
      if (!level) {
        console.log('42')
        throw new NotFoundException(`Level with ID ${dto.grade} not found.`);
      }

      const userFound = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (userFound) {
        console.log('49')
        throw new ConflictException('Cette adresse e-mail est déjà utilisée.');
      }

      const user = <UserEntity>{...dto,password:hashedPassword, attributionDate : new Date(), level: level}
      const seances = await this.seanceService.getAllFuturSeances();
      const userSaved = await this.userRepository.save(user);
      for(let seance of seances){
        this.userSeanceRepository.save({userId:userSaved.id, seanceId : seance.id, presence:false})
      }
      return userSaved;

    } catch (error) {
      console.log('59')
      throw new InternalServerErrorException(
        error,
        "Une erreur est survenue lors de la création de l'utilisateur.",
      );
    }
  }

  async create(data): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  async update(id: number, dto: UserCreateDTO): Promise<any> {

    console.log(dto)
    try {
      const level = await this.levelService.findLevelById(dto.grade)
      console.log(level)
      if (!level) {
        throw new NotFoundException(`Level with ID ${dto.grade} not found.`);
      }

      const user = new UserEntity();
      user.first_name = dto.first_name;
      user.last_name = dto.last_name;
      user.email = dto.email;
      user.gender = dto.gender;

      user.rue = dto.rue;
      user.commune = dto.commune;
      user.ville = dto.ville;
      user.birthDate = dto.birthDate;      
      user.attributionDate = new Date();
      user.actif = dto.actif;
      user.gsm = dto.gsm;
      user.level = level;
      user.status = dto.status;
      console.log('user modifié', this.userRepository.update(id, user));

      
      return this.userRepository.update(id, user);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        "Une erreur est survenue lors de la modification de l'utilisateur.",
      );
    }


  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  //Find a user by email
  async findOneByEmail(email: string): Promise<any> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<any> {
    return await this.userRepository.findOne({where:{id}, select:['id','first_name','last_name','gender','birthDate','rue','commune','ville','actif','gsm','email','status'],relations:['level']});
  }

  // async findOneById(id: number): Promise<any> {
  //   return await this.userRepository.findOne({where:{id}, relations:['level']});
  // }
  

  async findUserStatusByUserId(id: any) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('No user found by Id', HttpStatus.NOT_FOUND);
    }

    return user.status;
  }

  async participeSeance(dto: UserSeanceDTO) {
    try {
      const userSeance = await this.userSeanceRepository.save({...dto,presence:false})
      return userSeance;
    } catch (error) {
      throw error;
    }
  }

  async updateParticipeSeance(id:number,estPresent :boolean){
    try{
      const userSeance = await this.userSeanceRepository.findOne({where:{id}});
      if(!userSeance){
        throw new HttpException('No user_seance found by Id', HttpStatus.NOT_FOUND);
      }
      userSeance.presence=estPresent
      this.userSeanceRepository.save(userSeance)
    }
    catch(error){}
  }


  async findAllByIds(ids: number[]): Promise<UserEntity[]> {
    return await this.userRepository.findBy({ id: In(ids) });
  }

  async findProgram(id: number) {
    return await this.userRepository.findOne({ where: { id }, relations: ['level', 'level.program']})
  }


}
