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
import { Enrollment } from './enrollment.entity';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @HttpCode(200)
  async getAll(): Promise<Enrollment[]> {
    return await this.enrollmentsService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async getEnrollment(@Param('id') id: number): Promise<Enrollment | Error> {
    try {
      const res: Enrollment | Error = await this.enrollmentsService.findOne(id);
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
  async updateEnrollment(@Param('id') id, @Body() schoolUpdate: Enrollment) {
    try {
      const res: ObjectLiteral | Error = await this.enrollmentsService.update(
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
  deleteEnrollment(@Param('id') id) {
    return this.enrollmentsService.delete(id);
  }
}
