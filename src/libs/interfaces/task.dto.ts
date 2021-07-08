export class TaskDTO {
  task_id?: string;
  name: string;
  description: string;
  is_complete: boolean;
  created_at: Date;
  updated_at: Date;
  employee_id: string;
}
