import { Role } from '../entities/role.entity';
import { Task } from '../entities/task.entity';

export class EmployeeDTO {
  employee_id?: string;
  username: string;
  password: string;
  fullname: string;
  position: string;
  role_id: number;
  company_id: number;
}
