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

  findAll(): Promise<Faculty[]> {
    return this.facultyRepository.find();
  }

  async findOne(id: number): Promise<Faculty> {
    return await this.facultyRepository.findOne(id);
  }

  async create(newFaculty: Faculty): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.facultyRepository.insert(newFaculty))
        .generatedMaps[0];
      return insert;
    } catch (error) {
      return error;
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
      return error;
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.facultyRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { disabled: true, delete_at: time, id };
    } catch (error) {
      return error;
    }
  }
}
