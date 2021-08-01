import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { SectionsModule } from 'src/sections/sections.module';
import { SectionEnrollment } from './section-enrollment.entity';
import { SectionsEnrollmentsController } from './sections-enrollments.controller';
import { SectionsEnrollmentsService } from './sections-enrollments.service';

@Module({
  imports: [
    SectionsModule,
    EnrollmentsModule,
    TypeOrmModule.forFeature([SectionEnrollment]),
  ],
  controllers: [SectionsEnrollmentsController],
  providers: [SectionsEnrollmentsService],
})
export class SectionsEnrollmentsModule {}
