/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
  } from 'typeorm';
import { BaseEntity } from './base.entity';
  
  
  export abstract class EntityClass extends BaseEntity {
    
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;
  
   
  }
  