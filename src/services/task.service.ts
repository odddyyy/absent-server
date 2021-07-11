import { HttpException, Injectable } from '@nestjs/common';
import { Task } from 'src/libs/entities/task.entity';
import { TaskDTO } from 'src/libs/interfaces/task.dto';
import { createTaskDTO } from 'src/shared/requestVM/create-task.dto';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { DateFormat } from 'src/utils/date.utility';
import { getConnection } from 'typeorm';

@Injectable()
export class TaskService {
  async findAllTask(employee_id: string): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const result: TaskDTO[] = await transaction.find(Task, {
          where: { employee_id },
        });
        response.status = 'ok';
        response.message = 'success';
        response.data = result;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async findOneTask(
    employee_id: string,
    task_id: string
  ): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const task = await transaction.findOne(Task, {
          where: { employee_id, task_id },
        });
        response.status = 'ok';
        response.message = 'success';
        response.data = task;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async createNewTask(
    employee_id: string,
    payload: createTaskDTO
  ): Promise<generalResponse> {
    const response = new generalResponse();
    const { name, description } = payload;
    await getConnection()
      .transaction(async (transaction) => {
        const newTask = transaction.create(Task, {
          name,
          description,
          employee_id,
          created_at: DateFormat.GMT(7),
          updated_at: DateFormat.GMT(7),
        });
        await transaction.save(Task, newTask);
        response.status = 'ok';
        response.message = 'task created';
        response.data = newTask;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async editTask(employee_id: string, payload: createTaskDTO) {
    const response = new generalResponse();
    const { task_id, name, description, is_complete } = payload;
    await getConnection()
      .transaction(async (transaction) => {
        const task = await transaction.findOneOrFail(Task, {
          where: { employee_id, task_id },
        });
        task.description = description;
        task.name = name;
        task.is_complete = is_complete;
        await task.save();
        response.status = 'ok';
        response.message = 'task created';
        response.data = task;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async deleteTask(employee_id: string, taks_id: string) {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        await transaction.delete(Task, {
          employee_id,
          taks_id,
        });
        response.status = 'ok';
        response.message = 'task deleted';
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
  }
}
