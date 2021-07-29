/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column()
  ci: string;
}
