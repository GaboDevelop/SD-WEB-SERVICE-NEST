import {
  Body,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import { Person } from './person.entity';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  async getAll(@Query() params): Promise<ObjectLiteral> {
    try {
      return await this.personService.findAll(params);
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
        return e;
      } else {
        // everything else
        console.log(e.message);
        return e;
      }
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getPerson(@Param('id') id: number): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.personService.findOne(id);
      return res;
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
        return { success: false, error: e.message };
      } else {
        // everything else
        console.log(e.message);
        return { success: false, error: e.message };
      }
    }
  }

  @Post()
  @HttpCode(201)
  createEmployee(@Body() newEmployee: Person) {
    try {
      const res: ObjectLiteral | Error = this.personService.create(newEmployee);
      return res;
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
        return e;
      } else {
        // everything else
        console.log(e.message);
        return e;
      }
    }
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la persona a encontrar',
  })
  @ApiBody({
    type: Person,
  })
  @HttpCode(200)
  async updateEmployee(@Param('id') id, @Body() personUpdate: Person) {
    try {
      return await this.personService.update(id, personUpdate);
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
        return e;
      } else {
        // everything else
        console.log(e.message);
        return e;
      }
    }
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la persona a encontrar',
    type: Number,
  })
  @HttpCode(200)
  async deletePerson(@Param('id') id): Promise<ObjectLiteral> {
    try {
      return await this.personService.delete(parseInt(id));
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
        return e;
      } else {
        // everything else
        console.log(e.message);
        return e;
      }
    }
  }
}
