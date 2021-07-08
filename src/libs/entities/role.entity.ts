import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  role_id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employee: Employee;
}
