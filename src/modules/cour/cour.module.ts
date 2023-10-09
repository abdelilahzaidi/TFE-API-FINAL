import { Module, forwardRef } from '@nestjs/common';
import { CourController } from './cour.controller';
import { CourService } from './cour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourEntity } from 'src/commun/entities/cour/cour';
import { LieuModule } from '../lieu/lieu.module';

@Module({
  imports:[TypeOrmModule.forFeature([CourEntity]),
  forwardRef(()=>LieuModule)
],
  controllers: [CourController],
  providers: [CourService],
  exports:[CourService]
})
export class CourModule {}
