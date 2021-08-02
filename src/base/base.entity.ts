/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['enable', 'disabled'],
    default: 'enable',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @Column({nullable: true})
  delete_at: Date;
}
