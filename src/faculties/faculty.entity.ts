/* eslint-disable prettier/prettier */
import { EntityClass } from 'src/base/entity.entity';
import { School } from 'src/schools/school.entity';
import {
  Entity, OneToMany,
} from 'typeorm';

@Entity()
export class Faculty extends EntityClass {
    @OneToMany(() => School, school => school.faculty)
    schools: School[];;
}
