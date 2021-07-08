import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  company_id: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  name: string;

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

  @OneToMany(() => Employee, (employee) => employee.company)
  employee: Employee;
}
