import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createTaskDTO } from 'src/shared/requestVM/create-task.dto';
import { TaskService } from '../services/task.service';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAllTasks(@Req() request: any) {
    return this.taskService.findAllTask(request.user.employee_id);
  }

  @Get(':id')
  findOneTask(@Req() request: any, @Param('id') task_id: string) {
    return this.taskService.findOneTask(request.user.employee_id, task_id);
  }

  @Post()
  createNewTask(@Req() request: any, @Body() payload: createTaskDTO) {
    return this.taskService.createNewTask(request.user.employee_id, payload);
  }
}
