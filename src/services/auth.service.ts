import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { EntityManager, getConnection } from 'typeorm';
import { Employee } from 'src/libs/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async Login({ username, password }): Promise<generalResponse> {
    const result = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const employee = await this.getEmployeeDetails(username, transaction);
        if (!employee)
          throw new HttpException('invalid username / password', 400);
        const validatePassword = await bcrypt.compare(
          password,
          employee.password
        );
        if (!validatePassword)
          throw new HttpException('invalid username / password', 400);
        result.status = 'ok';
        result.message = 'login success';
        result.data = {
          access_token: this.jwtService.sign({
            id: employee.employee_id,
            role: employee.role.name,
            company: employee.company?.company_id || null,
          }),
        };
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
    return result;
  }

  private async getEmployeeDetails(
    username: string,
    transaction: EntityManager
  ) {
    return transaction.findOne(Employee, {
      where: { username },
      relations: ['role', 'company'],
    });
  }
}
