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
import { Section } from './section.entity';
import { SectionsService } from './sections.service';
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @HttpCode(200)
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  async getAll(@Query() params): Promise<ObjectLiteral | Error> {
    try {
      return await this.sectionsService.findAll(params);
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la seccion a encontrar sus estudiantes',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador de la seccion a encontrar sus profesores',
  })
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
    description: 'identificador de la seccion a encontrar',
  })
  @ApiBody({
    type: Section,
  })
  @HttpCode(200)
  async updateSection(@Param('id') id, @Body() sectionUpdate: Section) {
    try {
      const res: ObjectLiteral | Error = await this.sectionsService.update(
        id,
        sectionUpdate,
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
  async deleteSection(@Param('id') id) {
    try {
      return await this.sectionsService.delete(parseInt(id));
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
