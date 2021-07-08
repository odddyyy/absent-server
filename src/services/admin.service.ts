import { HttpException, Injectable } from '@nestjs/common';
import { Employee } from 'src/libs/entities/employee.entity';
import { EmployeeDTO } from 'src/libs/interfaces/employee.dto';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ADMIN } from 'src/shared/constants/role.constant';

@Injectable()
export class AdminService {
  async registerEmployee(
    payload: EmployeeDTO,
    user: any
  ): Promise<generalResponse> {
    const response = new generalResponse();
    const { username, password, fullname, position } = payload;
    const { role_name, company_id } = user;
    await getConnection()
      .transaction(async (transaction) => {
        if (!ADMIN.includes(role_name)) {
          throw new HttpException('Unauthorized', 404);
        }
        const exist = await transaction.findOne(Employee, {
          where: { username },
        });
        if (exist) throw new HttpException('employee already exist', 400);
        await transaction
          .create(Employee, {
            username,
            password: await bcrypt.hash(password, 10),
            fullname,
            position,
            role: {
              role_id: 3,
            },
            company: {
              company_id: company_id,
            },
          })
          .save();
        response.status = 'ok';
        response.message = 'new employee created';
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
    return response;
  }

  async deleteEmployee(
    user: any,
    deleted_id: string
  ): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        if (!ADMIN.includes(user.role_name)) {
          throw new HttpException('unauthorized', 404);
        }
        await transaction.delete(Employee, {
          employee_id: deleted_id,
        });
        response.status = 'ok';
        response.message = 'employee deleted';
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
    return response;
  }
}
