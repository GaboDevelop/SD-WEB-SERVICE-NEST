import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { School } from './school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
