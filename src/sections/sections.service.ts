import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/persons/person.entity';
import { SectionEnrollment } from 'src/sectionsEnrollments/section-enrollment.entity';
import { ObjectLiteral, Repository, getConnection } from 'typeorm';
import { Section } from './section.entity';
@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async findAll(): Promise<ObjectLiteral> {
    try {
      const sections: Section[] = await this.sectionRepository.find();
      return { success: true, sections: sections };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async findOne(id: number): Promise<ObjectLiteral | Error> {
    try {
      const section: Section = await this.sectionRepository.findOne(id);
      if (section) {
        return { success: true, section: section };
      } else {
        return { success: false, section: {} };
      }
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async findStudents(id: number): Promise<ObjectLiteral | Error> {
    try {
      const query: ObjectLiteral[] = await getConnection()
        .createQueryBuilder()
        .select(['section_enrollment.id', 'enrollment.id', 'person'])
        .from(SectionEnrollment, 'section_enrollment')
        .innerJoin('section_enrollment.enrollment', 'enrollment')
        .innerJoin('enrollment.person', 'person')
        .where('section_enrollment.id_section = :id', { id: id })
        .andWhere('enrollment.type = :type', { type: 'student' })
        .getMany();
      const persons: Person[] = [];
      for (let i = 0; i < query.length; i++) {
        const person: Person = query[i].enrollment.person;
        persons.push(person);
      }
      return { success: true, persons: persons };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async findTeacher(id: number): Promise<ObjectLiteral | Error> {
    try {
      const query: ObjectLiteral[] = await getConnection()
        .createQueryBuilder()
        .select(['section_enrollment.id', 'enrollment.id', 'person'])
        .from(SectionEnrollment, 'section_enrollment')
        .innerJoin('section_enrollment.enrollment', 'enrollment')
        .innerJoin('enrollment.person', 'person')
        .where('section_enrollment.id_section = :id', { id: id })
        .andWhere('enrollment.type = :type', { type: 'teacher' })
        .getMany();
      const persons: Person[] = [];
      for (let i = 0; i < query.length; i++) {
        const person: Person = query[i].enrollment.person;
        persons.push(person);
      }
      return { success: true, persons: persons };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async create(newSection: Section): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.sectionRepository.insert(newSection))
        .generatedMaps[0];
      return { success: true, section: insert };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async update(
    id: number,
    schoolUpdate: Section,
  ): Promise<ObjectLiteral | Error> {
    try {
      await this.sectionRepository.update(id, schoolUpdate);
      return { success: true, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.sectionRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { success: true, disabled: true, delete_at: time, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
