import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { School } from './school.entity';
@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  findAll(): Promise<School[]> {
    return this.schoolRepository.find();
  }

  async findOne(id: number): Promise<School> {
    return await this.schoolRepository.findOne(id);
  }

  async create(newSchool: School): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.schoolRepository.insert(newSchool))
        .generatedMaps[0];
      return insert;
    } catch (error) {
      return error;
    }
  }

  async update(
    id: number,
    schoolUpdate: School,
  ): Promise<ObjectLiteral | Error> {
    try {
      await this.schoolRepository.update(id, schoolUpdate);
      return { success: true, id };
    } catch (error) {
      return error;
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.schoolRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { disabled: true, delete_at: time, id };
    } catch (error) {
      return error;
    }
  }
}
