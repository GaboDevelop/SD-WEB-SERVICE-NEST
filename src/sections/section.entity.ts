/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { EntityClass } from 'src/base/entity.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { School } from 'src/schools/school.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Section extends EntityClass {

    @ApiProperty()
    @Column()
    uc: number;

    @ApiProperty()
    @Column()
    semester: number;

    @Column({
        type: 'enum',
        enum: ['mandatory', 'elective'],
        default: 'mandatory',
    })
    type: string;

    @ApiProperty()
    @Column({type:"float8",width: 10})
    ht: number;

    @ApiProperty()
    @Column({type:"float8",width: 10})
    hp: number;

    @ApiProperty()
    @Column({type:"float8",width: 10})
    hi: number;
    

    @ManyToOne(() => School, school => school.sections)
    school: School;

    @ManyToMany(() => Enrollment, enrollment => enrollment.sections)
    enrollments: Enrollment[];
}
