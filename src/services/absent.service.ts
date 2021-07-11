import { HttpException, Injectable } from '@nestjs/common';
import { Absent } from 'src/libs/entities/absent.entity';
import { generalResponse } from 'src/shared/responseVM/general-responseVM';
import { DateFormat } from 'src/utils/date.utility';
import { getConnection } from 'typeorm';

@Injectable()
export class AbsentService {
  async createAbsentEmployee(
    employee_id: string,
    payload: any
  ): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        const newAbsent = transaction.create(Absent, {
          absent_type: payload.type,
          note: payload.note,
          employee_id: employee_id,
          timelog: DateFormat.GMT(7),
        });
        await transaction.save(Absent, newAbsent);
        response.status = 'ok';
        response.message = 'absent created';
        response.data = newAbsent;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async editAbsentEmployee(
    absent_id: string,
    payload: any
  ): Promise<generalResponse> {
    const response = new generalResponse();
    const { type, note } = payload;
    await getConnection()
      .transaction(async (transaction) => {
        const absent = await transaction.findOne(Absent, {
          where: { absent_id },
        });
        absent.absent_type = type;
        absent.note = note;
        await transaction.save(Absent, absent);
        response.status = 'ok';
        response.message = 'absent edited';
        response.data = absent;
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }

  async deleteAbsentEmployee(absent_id: string): Promise<generalResponse> {
    const response = new generalResponse();
    await getConnection()
      .transaction(async (transaction) => {
        await transaction.delete(Absent, {
          absent_id,
        });
        response.status = 'ok';
        response.message = 'absent deleted';
      })
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
    return response;
  }
}
