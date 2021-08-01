import {
  Body,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Controller,
  Get,
} from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { School } from './school.entity';
import { SchoolsService } from './schools.service';
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolService: SchoolsService) {}

  @Get()
  @HttpCode(200)
  async getAll(): Promise<School[]> {
    return await this.schoolService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getSchool(@Param('id') id: number): Promise<School | Error> {
    try {
      const res: School | Error = await this.schoolService.findOne(id);
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
  async updateSchool(@Param('id') id, @Body() schoolUpdate: School) {
    try {
      const res: ObjectLiteral | Error = await this.schoolService.update(
        id,
        schoolUpdate,
      );
      console.log('res', res);
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

  @Delete('/:id')
  @HttpCode(200)
  deleteSchool(@Param('id') id) {
    return this.schoolService.delete(id);
  }
}
