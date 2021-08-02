import {
  Body,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import { School } from './school.entity';
import { SchoolsService } from './schools.service';
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolService: SchoolsService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @HttpCode(200)
  async getAll(@Query() params): Promise<ObjectLiteral | Error> {
    try {
      return await this.schoolService.findAll(params);
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
  async getSchool(@Param('id') id: number): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.schoolService.findOne(id);
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

  @Post()
  @HttpCode(201)
  async createSchool(@Body() newSchool: School) {
    try {
      const res: ObjectLiteral | Error = await this.schoolService.create(
        newSchool,
      );
      return res;
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la escuela a encontrar',
  })
  @ApiBody({
    type: School,
  })
  async updateSchool(@Param('id') id, @Body() schoolUpdate: School) {
    try {
      const res: ObjectLiteral | Error = await this.schoolService.update(
        id,
        schoolUpdate,
      );
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

  @Delete('/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la escuela a encontrar',
  })
  deleteSchool(@Param('id') id) {
    return this.schoolService.delete(id);
  }
}
