import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Employee } from 'src/libs/entities/employee.entity';
import { EmployeeDTO } from 'src/libs/interfaces/employee.dto';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { EntityManager, getConnection } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAllEmployee(): Promise<generalResponse> {
    const result = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const employees = await transaction.find(Employee, {
          select: ['employee_id', 'username', 'fullname', 'position'],
        });
        result.status = 'ok';
        result.message = 'success';
        result.data = employees;
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
    return result;
  }

  async getEmployeeDetails(id: string): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const employee = await transaction.findOne(Employee, {
          where: { employee_id: id },
          select: ['employee_id', 'fullname', 'username', 'position'],
          relations: ['absent_record', 'role', 'task'],
        });
        response.status = 'ok';
        response.message = 'success';
        response.data = employee;
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
    return response;
  }

  async editEmployeeDetail(employee_id: string, payload: any) {
    const response = new generalResponse();
    await getConnection().transaction(async (transaction) => {
      const oldData = await transaction.findOne(Employee, {
        where: { employee_id },
      });
      await transaction.save(Employee, {
        ...oldData,
        ...payload,
      });
      response.status = 'ok';
      response.message = 'profile updated';
    });
    return response;
  }

  async changeEmployeePassword(employee_id: string, payload: any) {
    const response = new generalResponse();
    const { old_password, new_password } = payload;
    await getConnection().transaction(async (transaction) => {
      const oldData = await transaction.findOne(Employee, {
        where: { employee_id },
      });
      if (!(await bcrypt.compare(old_password, oldData.password))) {
        throw new HttpException('invalid password', 400);
      }
      await transaction.save(Employee, {
        ...oldData,
        password: await bcrypt.hash(new_password, 10),
      });
      response.status = 'ok';
      response.message = 'password updated';
    });
    return response;
  }
}
