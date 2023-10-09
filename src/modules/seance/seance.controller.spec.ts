import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/modules/seance/seance.controller.spec.ts
import { SeanceController } from './seance.controller';

describe('SeanceController', () => {
  let controller: SeanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeanceController],
    }).compile();

    controller = module.get<SeanceController>(SeanceController);
========
import { HoraireController } from './horaire.controller';

describe('HoraireController', () => {
  let controller: HoraireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoraireController],
    }).compile();

    controller = module.get<HoraireController>(HoraireController);
>>>>>>>> af994d45ba83eff930e40836ad0807c450a80f60:src/modules/horaire/horaire.controller.spec.ts
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
