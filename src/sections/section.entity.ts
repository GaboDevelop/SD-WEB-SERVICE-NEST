/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { EntityClass } from 'src/base/entity.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { School } from 'src/schools/school.entity';
import { SectionEnrollment } from 'src/sectionsEnrollments/section-enrollment.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
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
    

    @ApiProperty({
        type: Number,
        description: 'id reference row in School',
        name:"school",
        minimum: 1,
    })

    @ManyToOne(() => School, school => school.sections)
    @JoinColumn({ name: "id_school" })
    school: School;

    @OneToMany(() => SectionEnrollment, (sectionEnrollment) => sectionEnrollment.section)
    SectionsEnrollments: SectionEnrollment[];
}
