import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/sections/section.entity';
import { SectionsService } from 'src/sections/sections.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private readonly sectionService: SectionsService,
  ) {}

  async findAll(params: undefined | ObjectLiteral): Promise<ObjectLiteral> {
    try {
      if (!!params && params.status) {
        const enrollments: Enrollment[] = await this.enrollmentRepository.find({
          status: params.status,
        });
        return { success: true, enrollments: enrollments };
      } else {
        const enrollments: Enrollment[] =
          await this.enrollmentRepository.find();
        return { success: true, enrollments: enrollments };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async findOne(id: number): Promise<ObjectLiteral | Error> {
    try {
      const enrollment: Enrollment = await this.enrollmentRepository.findOne(
        id,
      );
      if (enrollment) {
        return { success: true, enrollment: enrollment };
      } else {
        return { success: false, enrollment: {} };
      }
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async create(newEnrollment: Enrollment): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.enrollmentRepository.insert(newEnrollment))
        .generatedMaps[0];
      return { success: true, faculty: insert };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: number,
    schoolUpdate: Enrollment,
  ): Promise<ObjectLiteral | Error> {
    try {
      await this.enrollmentRepository.update(id, schoolUpdate);
      return { success: true, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.enrollmentRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { success: true, disabled: true, delete_at: time, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
