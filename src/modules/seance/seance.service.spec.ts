import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/modules/seance/seance.service.spec.ts
import { SeanceService } from './seance.service';

describe('SeanceService', () => {
  let service: SeanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeanceService],
    }).compile();

    service = module.get<SeanceService>(SeanceService);
========
import { HoraireService } from './horaire.service';

describe('HoraireService', () => {
  let service: HoraireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoraireService],
    }).compile();

    service = module.get<HoraireService>(HoraireService);
>>>>>>>> af994d45ba83eff930e40836ad0807c450a80f60:src/modules/horaire/horaire.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
