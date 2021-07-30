/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Person extends BaseEntity {

  @ApiProperty()
  @Column()
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column()
  ci: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.person)
  enrollments: Enrollment[];

}
