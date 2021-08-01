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

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find();
  }

  async findOne(id: number): Promise<Enrollment> {
    return await this.enrollmentRepository.findOne(id);
  }

  async create(newEnrollment: Enrollment): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.enrollmentRepository.insert(newEnrollment))
        .generatedMaps[0];
      return insert;
    } catch (error) {
      return error;
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
      return error;
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.enrollmentRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { disabled: true, delete_at: time, id };
    } catch (error) {
      return error;
    }
  }
}
