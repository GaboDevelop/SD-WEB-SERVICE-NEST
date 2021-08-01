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

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    return await this.personRepository.findOne(id);
  }

  async create(newPerson: Person): Promise<ObjectLiteral | Error> {
    try {
      const insert = (await this.personRepository.insert(newPerson))
        .generatedMaps[0];
      return insert;
    } catch (error) {
      return error;
    }
  }

  update(id: number, personUpdate: Person) {
    this.personRepository.update(id, personUpdate);
  }

  async delete(id: number): Promise<ObjectLiteral | Error> {
    try {
      await this.personRepository.update(id, { status: 'disabled' });
      return { disabled: true, id };
    } catch (error) {
      return error;
    }
  }
}
