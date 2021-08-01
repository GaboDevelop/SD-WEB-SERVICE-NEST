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
import { Section } from './section.entity';
import { SectionsService } from './sections.service';
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @HttpCode(200)
  async getAll(): Promise<ObjectLiteral> {
    try {
      return await this.sectionsService.findAll();
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
  async getSection(@Param('id') id: number): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.sectionsService.findOne(id);
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

  @Get('/students/:id')
  @HttpCode(200)
  async getSectionStudents(
    @Param('id') id: number,
  ): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error =
        await this.sectionsService.findStudents(id);
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

  @Get('/teachers/:id')
  @HttpCode(200)
  async getSectionTeachers(
    @Param('id') id: number,
  ): Promise<ObjectLiteral | Error> {
    try {
      const res: ObjectLiteral | Error = await this.sectionsService.findTeacher(
        id,
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

  @Post()
  @HttpCode(201)
  async createSection(@Body() newSection: Section) {
    try {
      const res: ObjectLiteral | Error = await this.sectionsService.create(
        newSection,
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
  async updateSection(@Param('id') id, @Body() schoolUpdate: Section) {
    try {
      const res: ObjectLiteral | Error = await this.sectionsService.update(
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
  deleteSection(@Param('id') id) {
    return this.sectionsService.delete(id);
  }
}
