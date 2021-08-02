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
import { ApiBody } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import { SectionEnrollment } from './section-enrollment.entity';
import { SectionsEnrollmentsService } from './sections-enrollments.service';

@Controller('sections-enrollments')
export class SectionsEnrollmentsController {
  constructor(
    private readonly sectionsEnrollmentsService: SectionsEnrollmentsService,
  ) {}

  @Post()
  @HttpCode(201)
  async createEnrollmentSection(@Body() data: SectionEnrollment) {
    try {
      const res: ObjectLiteral | Error =
        await this.sectionsEnrollmentsService.create(data);
      return res;
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
      } else {
        // everything else
        console.log(e.message);
      }
      return e;
    }
  }

  @Delete()
  @ApiBody({
    type: SectionEnrollment,
  })
  @HttpCode(200)
  async deleteEnrollmentSection(@Body() data: SectionEnrollment) {
    try {
      const res: ObjectLiteral | Error =
        await this.sectionsEnrollmentsService.delete(data);
      return res;
    } catch (e) {
      if (e instanceof TypeError) {
        // A TypeError
        console.log('type error!!');
      } else {
        // everything else
        console.log(e.message);
      }
      return e;
    }
  }
}
