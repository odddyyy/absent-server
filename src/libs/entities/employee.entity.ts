import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Absent } from './absent.entity';
import { Company } from './company.entity';
import { Role } from './role.entity';
import { Task } from './task.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  employee_id: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  username: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  password: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  fullname: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  position: string;

  // role_id here === role_id in Role table
  @ManyToOne(() => Role, (role) => role.role_id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: Role;

  // company_id here === company_id in company table
  @ManyToOne(() => Company, (company) => company.company_id)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'company_id' })
  company: Company;

  // reference column = employee_id in Absent entity
  @OneToMany(() => Absent, (absent) => absent.employee_id)
  absent_record: Absent[];

  @OneToMany(() => Task, (task) => task.employee_id)
  @JoinColumn({ name: 'task', referencedColumnName: 'task_id' })
  task: Task;
}
