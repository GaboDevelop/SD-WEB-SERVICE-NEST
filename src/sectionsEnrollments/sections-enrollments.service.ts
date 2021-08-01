import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { Section } from 'src/sections/section.entity';
import { SectionsService } from 'src/sections/sections.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { SectionEnrollment } from './section-enrollment.entity';

@Injectable()
export class SectionsEnrollmentsService {
  constructor(
    @InjectRepository(SectionEnrollment)
    private sectionEnrollmentRepository: Repository<SectionEnrollment>,
    private readonly sectionService: SectionsService,
    private readonly enrollmentService: EnrollmentsService,
  ) {}

  async create(data: SectionEnrollment): Promise<ObjectLiteral | Error> {
    try {
      const newSectionEnrollment = new SectionEnrollment();

      const exist = await this.sectionEnrollmentRepository.findOne({
        section: data.section,
        enrollment: data.enrollment,
      });
      const section: { succes: boolean; section: Section } | ObjectLiteral =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.sectionService.findOne(data.section);
      const enrollment: Enrollment = await this.enrollmentService.findOne(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.enrollment,
      );
      if (exist) {
        const error = 'the record already exists';
        return { success: false, error };
      } else if (!section.success || !enrollment) {
        const error = 'the record Section or Enrollment not exists';
        return { success: false, error };
      } else {
        newSectionEnrollment.section = section.section;
        newSectionEnrollment.enrollment = enrollment;
        const insert = (
          await this.sectionEnrollmentRepository.insert(newSectionEnrollment)
        ).generatedMaps[0];
        return { success: true, data: insert };
      }
    } catch (error) {
      return error;
    }
  }
}
