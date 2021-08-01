/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Enrollment } from 'src/enrollments/enrollment.entity';
import { School } from 'src/schools/school.entity';
import { Section } from 'src/sections/section.entity';
import {
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity({
    name:'section_enrollment'
})
export class SectionEnrollment extends BaseEntity {

    @ApiProperty({
        type: Number,
        description: 'id reference to section row',
        name:"section",
        minimum: 1,
    })
    @ManyToOne(() => Section, section => section.SectionsEnrollments)
    @JoinColumn({ name: "id_section" })
    section: Section;

    @ApiProperty({
        type: Number,
        description: 'id referente to enrollment row',
        name:"enrollment",
        minimum: 1,
    })
    @ManyToOne(() => Enrollment, enrollment => enrollment.SectionsEnrollments)
    @JoinColumn({ name: "id_enrollment" })
    enrollment: Enrollment;
}
