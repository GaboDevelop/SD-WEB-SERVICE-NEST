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
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @HttpCode(200)
  async getAll(@Query() params): Promise<ObjectLiteral | Error> {
    try {
      return await this.enrollmentsService.findAll(params);
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
  async getEnrollment(@Param('id') id: number): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.enrollmentsService.findOne(id);
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
  async createEnrollment(@Body() newEnrollment: Enrollment) {
    try {
      const res: ObjectLiteral | Error = await this.enrollmentsService.create(
        newEnrollment,
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
    description: 'identificador de la inscripcion a encontrar',
  })
  async updateEnrollment(@Param('id') id, @Body() schoolUpdate: Enrollment) {
    try {
      const res: ObjectLiteral | Error = await this.enrollmentsService.update(
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
    description: 'identificador de la inscripcion a encontrar',
  })
  async deleteEnrollment(@Param('id') id) {
    try {
      return await this.enrollmentsService.delete(parseInt(id));
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
