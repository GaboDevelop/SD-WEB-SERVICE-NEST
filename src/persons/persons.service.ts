import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(params: undefined | ObjectLiteral): Promise<ObjectLiteral> {
    try {
      if (!!params && params.status) {
        const persons: Person[] = await this.personRepository.find({
          status: params.status,
        });
        return { success: true, persons: persons };
      } else {
        const persons: Person[] = await this.personRepository.find();
        return { success: true, persons: persons };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async findOne(id: number): Promise<ObjectLiteral | Error> {
    try {
      const person: Person = await this.personRepository.findOne(id);;
      if (person) {
        return { success: true, person: person };
      } else {
        return { success: false, person: {} };
      }
    } catch (error) {
      return { succes: false, error: error.message };
    }
  }

  async create(newPerson: Person): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.personRepository.insert(newPerson))
        .generatedMaps[0];
      return { success: true, person: insert };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    id: number,
    personUpdate: Person,
  ): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.personRepository.update(id, personUpdate))
        .generatedMaps[0];
      return { success: true, data: insert };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      const time = new Date().toISOString();
      await this.personRepository.update(id, {
        status: 'disabled',
        delete_at: time,
        id,
      });
      return { success: true, disabled: true, id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
