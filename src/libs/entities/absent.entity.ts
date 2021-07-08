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
export class Absent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  absent_id: string;

  @Column({
    type: 'timestamptz',
  })
  timelog: Date;

  @Column()
  absent_type: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  note: string;

  // Foreing Key
  @ManyToOne(() => Employee, (employee) => employee.absent_record)
  @JoinColumn({ name: 'employee_id' })
  employee_id: string;
}
