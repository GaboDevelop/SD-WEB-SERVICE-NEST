import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { FacultiesController } from './faculties/faculties.controller';
import { FacultiesService } from './faculties/faculties.service';
import { FacultiesModule } from './faculties/faculties.module';
import { SchoolsModule } from './schools/schools.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SectionsModule } from './sections/sections.module';
import { SectionsEnrollmentsModule } from './sectionsEnrollments/sections-enrollments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'web-service',
      //entities: ['dist/**/*.entity{.ts,.js}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: './migrations',
      },
    }),
    PersonsModule,
    FacultiesModule,
    SchoolsModule,
    EnrollmentsModule,
    SectionsModule,
    SectionsEnrollmentsModule,
  ],
})
export class AppModule {}
