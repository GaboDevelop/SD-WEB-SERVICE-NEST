/* eslint-disable prettier/prettier */
import { EntityClass } from 'src/base/entity.entity';
import { Faculty } from 'src/faculties/faculty.entity';
import { Section } from 'src/sections/section.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class School extends EntityClass {
    @ManyToOne(() => Faculty, faculty => faculty.schools)
    faculty: Faculty;

    @OneToMany(() => Section, section => section.school)
    sections: Section[];;
}
