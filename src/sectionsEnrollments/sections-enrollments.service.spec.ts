import { Test, TestingModule } from '@nestjs/testing';
import { SectionsEnrollmentsService } from './sections-enrollments.service';

describe('SectionsEnrollmentsService', () => {
  let service: SectionsEnrollmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionsEnrollmentsService],
    }).compile();

    service = module.get<SectionsEnrollmentsService>(SectionsEnrollmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
