import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Absent } from 'src/libs/entities/absent.entity';
import { EmployeeDTO } from 'src/libs/interfaces/employee.dto';
import { AbsentService } from 'src/services/absent.service';
import { EmployeeService } from '../services/employee.service';

@Controller('employee')
@UseGuards(AuthGuard('jwt'))
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly absentService: AbsentService
  ) {}

  @Get('/get-detail')
  getEmployeeDetails(@Req() req: any) {
    return this.employeeService.getEmployeeDetails(req.user.employee_id);
  }

  @Put('edit-detail')
  editEmployeeDetail(@Req() req: any, @Body() payload: EmployeeDTO) {
    return this.employeeService.editEmployeeDetail(
      req.user.employee_id,
      payload
    );
  }

  @Put('change-password')
  changeEmployeePassword(@Req() req: any, @Body() payload: any) {
    return this.employeeService.changeEmployeePassword(
      req.user.employee_id,
      payload
    );
  }

  @Post('/create-absent')
  createAbsentEmployee(@Req() request: any, @Body() payload: any) {
    return this.absentService.createAbsentEmployee(
      request.user.employee_id,
      payload
    );
  }

  @Put('/edit-absent/:absent_id')
  editAbsentEmployee(
    @Param('absent_id') absent_id: string,
    @Body() payload: Absent
  ) {
    return this.absentService.editAbsentEmployee(absent_id, payload);
  }

  @Delete('/delete-absent/:absent_id')
  deleteAbsentEmployee(@Param('absent_id') absent_id: string) {
    return this.absentService.deleteAbsentEmployee(absent_id);
  }
}
