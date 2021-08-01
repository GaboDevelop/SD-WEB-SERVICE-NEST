/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { EntityClass } from 'src/base/entity.entity';
import { Faculty } from 'src/faculties/faculty.entity';
import { Section } from 'src/sections/section.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class School extends EntityClass {
    @ApiProperty({
      type: Number,
      description: 'id reference row in Faculty',
      name:"faculty",
      minimum: 1,
    })
    @ManyToOne(() => Faculty, faculty => faculty.schools)
    @JoinColumn({ name: "id_faculty" })
    faculty: Faculty;

    @OneToMany(() => Section, section => section.school)
    sections: Section[];
}
