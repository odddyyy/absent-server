import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from 'src/services/admin.service';
// import { RolesGuard } from 'src/shared/strategies/role.strategy';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/get-employees')
  findAllEmployeeByCompanyId(@Req() request: any) {
    return this.adminService.findAllEmployeeByCompanyId(
      request.user.company_id
    );
  }

  @Post('/register-employee')
  createNewEmployee(@Body() payload: any, @Req() request: any) {
    console.log(request.user);
    return this.adminService.registerEmployee(payload, request.user);
  }

  @Delete('/delete-employee/:id')
  deleteEmployee(@Req() request: any, @Param('id') deleted_id: string) {
    return this.adminService.deleteEmployee(request.user, deleted_id);
  }
}
