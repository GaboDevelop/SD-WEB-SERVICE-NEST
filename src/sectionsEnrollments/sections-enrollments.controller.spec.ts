import { Test, TestingModule } from '@nestjs/testing';
import { SectionsEnrollmentsController } from './sections-enrollments.controller';

describe('SectionsEnrollmentsController', () => {
  let controller: SectionsEnrollmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsEnrollmentsController],
    }).compile();

    controller = module.get<SectionsEnrollmentsController>(SectionsEnrollmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
