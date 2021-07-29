import { BadRequestException, Body, Catch, Delete, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { Person } from './person.entity';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get()
  async getAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  @Post()
  @HttpCode(201)
  createEmployee(@Body() newEmployee: Person) {
    throw new BadRequestException('you done goofed');
    try {
      const res: ObjectLiteral | Error = this.personService.create(newEmployee);
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
      } else {
        // everything else
        console.log(e.message);
      }
    }
  }

  @Put('/:id')
  @HttpCode(200)
  updateEmployee(@Param('id') id, @Body() personUpdate: any) {
    return this.personService.update(id, personUpdate);
  }

  @Delete('/:id')
  @HttpCode(200)
  deletePerson(@Param('id') id) {
    return this.personService.delete(id);
  }
}
