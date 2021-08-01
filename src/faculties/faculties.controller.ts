import { Body, Delete, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { FacultiesService } from './faculties.service';
import { Faculty } from './faculty.entity';
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultyService: FacultiesService) {}

  @Get()
  @HttpCode(200)
  async getAll(): Promise<Faculty[]> {
    return await this.facultyService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getFaculy(@Param('id') id: number): Promise<Faculty | Error> {
    try {
      const res: Faculty | Error = await this.facultyService.findOne(id);
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
  async createFaculty(@Body() newFaculty: Faculty) {
    try {
      const res: ObjectLiteral | Error = await this.facultyService.create(
        newFaculty,
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
  async updateFaculty(@Param('id') id, @Body() facultyUpdate: any) {
    try {
      const res: ObjectLiteral | Error = await this.facultyService.update(
        id,
        facultyUpdate,
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
  deleteFaculty(@Param('id') id) {
    return this.facultyService.delete(id);
  }
}
