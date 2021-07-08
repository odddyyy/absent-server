import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { createRoleDTO } from 'src/shared/requestVM/create-role.dto';
import { DataService } from '../services/data.service';

@Controller('data')
@UseGuards(AuthGuard('jwt'))
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/role')
  getAllRoles() {
    return this.dataService.getRoles();
  }

  @Post('/role')
  addRole(@Body() payload: createRoleDTO, @Req() request: Request) {
    return this.dataService.addRole(payload, request.user);
  }
}
