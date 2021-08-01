/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Person } from 'src/persons/person.entity';
import { Section } from 'src/sections/section.entity';
import { SectionEnrollment } from 'src/sectionsEnrollments/section-enrollment.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class Enrollment extends BaseEntity {

    @ApiProperty({
      type: String,
      description: 'Type enrollment person, teacher or student',
      default: 'student',
    })
    @Column({
        type: 'enum',
        enum: ['student', 'teacher'],
        default: 'student',
    })
    type: string;

    @ApiProperty({
      type: Number,
      description: 'id reference row in Person',
      name:"person",
      minimum: 1,
    })
    @ManyToOne(() => Person, person => person.enrollments)
    @JoinColumn({ name: "id_person" })
    person: Person;

    @OneToMany(() => SectionEnrollment, (sectionEnrollment) => sectionEnrollment.enrollment)
    SectionsEnrollments: SectionEnrollment[];
}
