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

  async findAll(params: undefined | ObjectLiteral): Promise<ObjectLiteral> {
    try {
      if (!!params && params.status) {
        const schools: School[] = await this.schoolRepository.find({
          status: params.status,
        });
        return { success: true, schools: schools };
      } else {
        const schools: School[] = await this.schoolRepository.find();
        return { success: true, schools: schools };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async findOne(id: number): Promise<ObjectLiteral | Error> {
    try {
      const school: School = await this.schoolRepository.findOne(id);
      if (school) {
        return { success: true, school: school };
      } else {
        return { success: false, school: {} };
      }
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async create(newSchool: School): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.schoolRepository.insert(newSchool))
        .generatedMaps[0];
      return { success: true, school: insert };
    } catch (error) {
      return { success: false, error: error.message };
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
      return { success: false, error: error.message };
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.schoolRepository.update(id, {
        status: 'disabled',
        delete_at: time,
      });
      return { success: true, disabled: true, delete_at: time, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
