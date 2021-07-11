import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Employee } from 'src/libs/entities/employee.entity';
import { Role } from 'src/libs/entities/role.entity';
import { createRoleDTO } from 'src/shared/requestVM/create-role.dto';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { getConnection } from 'typeorm';

@Injectable()
export class DataService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private ROLE_KEY = 'ROLES_DATA';

  async getRoles(): Promise<generalResponse> {
    const response = new generalResponse();
    let result: Role[];
    result = await this.cacheManager.get(this.ROLE_KEY);
    if (!result) {
      await getConnection()
        .transaction(async (transaction) => {
          result = await transaction.find(Role);
          await this.cacheManager.set(this.ROLE_KEY, result);
          response.status = 'ok';
          response.message = 'new role created';
        })
        .catch((err) => {
          throw new HttpException(err, err.status || 500);
        });
    }
    return response;
  }

  async addRole(payload: createRoleDTO, user: any): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const employeeDetail = await transaction.findOne(Employee, {
          where: { employee_id: user.employee_id },
          select: ['employee_id', 'role'],
          relations: ['role'],
        });
        console.log(employeeDetail);
        // if (!['super'].includes(employeeDetail.role_id.)) {
        //   throw new HttpException('Unauthorized', 404);
        // }
        await this.cacheManager.set(
          this.ROLE_KEY,
          await transaction
            .create(Role, {
              name: payload.name,
            })
            .save()
        );
        response.status = 'ok';
        response.message = 'new role created';
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }
}
