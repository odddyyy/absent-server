import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    default: false,
  })
  is_complete: boolean;

  @Column({
    nullable: false,
    type: 'timestamptz',
  })
  created_at: Date;

  @Column({
    nullable: false,
    type: 'timestamptz',
  })
  updated_at: Date;

  @ManyToOne(() => Employee, (employee) => employee.task)
  @JoinColumn({ name: 'employee_id' })
  employee_id: string;
}
