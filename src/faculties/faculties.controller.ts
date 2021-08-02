import { Body, Delete, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import { FacultiesService } from './faculties.service';
import { Faculty } from './faculty.entity';
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultyService: FacultiesService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @HttpCode(200)
  async getAll(@Query() params): Promise<ObjectLiteral | Error> {
    try {
      return await this.facultyService.findAll(params);
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
  async getFaculty(@Param('id') id: number): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.facultyService.findOne(id);
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
        return e;
      } else {
        // everything else
        console.log(e.message);
        return e;
      }
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la facultad a encontrar',
  })
  @ApiBody({
    type: Faculty,
  })
  async updateFaculty(@Param('id') id, @Body() facultyUpdate: Faculty) {
    try {
      const res: ObjectLiteral | Error = await this.facultyService.update(
        id,
        facultyUpdate,
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la facultad a encontrar',
  })
  @HttpCode(200)
  async deleteFaculty(@Param('id') id) {
    try {
      return await this.facultyService.delete(parseInt(id));
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
