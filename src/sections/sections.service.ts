import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Section } from './section.entity';
@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private schoolRepository: Repository<Section>,
  ) {}

  findAll(): Promise<Section[]> {
    return this.schoolRepository.find();
  }

  async findOne(id: number): Promise<Section> {
    return await this.schoolRepository.findOne(id);
  }

  async create(newSection: Section): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.schoolRepository.insert(newSection))
        .generatedMaps[0];
      return insert;
    } catch (error) {
      return error;
    }
  }

  async update(
    id: number,
    schoolUpdate: Section,
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
