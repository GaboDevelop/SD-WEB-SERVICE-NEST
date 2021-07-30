/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { Person } from 'src/persons/person.entity';
import { Section } from 'src/sections/section.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity()
export class Enrollment extends BaseEntity {

    @Column({
        type: 'enum',
        enum: ['student', 'teacher'],
        default: 'student',
    })
    type: string;

    @ManyToOne(() => Person, person => person.enrollments)
    person: Person;

    @ManyToMany(() => Section, section => section.enrollments)
    @JoinTable()
    sections: Section[];
}
