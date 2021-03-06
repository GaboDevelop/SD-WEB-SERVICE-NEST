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
      const enrollment:
        | { succes: boolean; enrollment: Enrollment }
        | ObjectLiteral = await this.enrollmentService.findOne(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.enrollment,
      );
      if (exist) {
        const error = 'the record already exists';
        return { success: false, error };
      } else if (!section.success || !enrollment.success) {
        const error = 'the record Section or Enrollment not exists';
        return { success: false, error };
      } else {
        newSectionEnrollment.section = section.section;
        newSectionEnrollment.enrollment = enrollment.enrollment;
        const insert = (
          await this.sectionEnrollmentRepository.insert(newSectionEnrollment)
        ).generatedMaps[0];
        return { success: true, data: insert };
      }
    } catch (error) {
      return error;
    }
  }

  async delete(data: SectionEnrollment): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      const sectionEnrollment: SectionEnrollment[] = await this.sectionEnrollmentRepository.find({
          section: data.section,
          enrollment: data.enrollment,
        });
      console.log(sectionEnrollment);
      if (sectionEnrollment) {
        await this.sectionEnrollmentRepository.update(sectionEnrollment[0].id, {
          status: 'disabled',
          delete_at: time,
        });
        return {
          success: true,
          disabled: true,
          delete_at: time,
          id: sectionEnrollment[0].id,
        };
      } else {
        return {
          success: false,
          error: 'No se encontro un registro con los datos sumistrados',
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
