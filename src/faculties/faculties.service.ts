import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Faculty } from './faculty.entity';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>,
  ) {}

  async findAll(params: undefined | ObjectLiteral): Promise<ObjectLiteral> {
    try {
      if (!!params && params.status) {
        const faculties: Faculty[] = await this.facultyRepository.find({
          status: params.status,
        });
        return { success: true, faculties: faculties };
      } else {
        const faculties: Faculty[] = await this.facultyRepository.find();
        return { success: true, faculties: faculties };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async findOne(id: number): Promise<ObjectLiteral | Error> {
    try {
      const faculty: Faculty = await this.facultyRepository.findOne(id);
      if (faculty) {
        return { success: true, faculty: faculty };
      } else {
        return { success: false, faculty: {} };
      }
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async create(newFaculty: Faculty): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.facultyRepository.insert(newFaculty))
        .generatedMaps[0];
      return { success: true, faculty: insert };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: number,
    facultyUpdate: Faculty,
  ): Promise<ObjectLiteral | Error> {
    try {
      await this.facultyRepository.update(id, facultyUpdate);
      return { success: true, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.facultyRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { success: true, disabled: true, delete_at: time, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
