import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './controllers/data.controller';
import { AuthController } from './controllers/auth.controller';
import { EmployeeController } from './controllers/employee.controller';
import { AbsentService } from './services/absent.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { EmployeeService } from './services/employee.service';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { JWT_CONSTANT } from './shared/constants/env.constant';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    JwtModule.register({
      ...JWT_CONSTANT,
    }),
    CacheModule.register(),
  ],
  controllers: [
    AdminController,
    AuthController,
    DataController,
    EmployeeController,
    TaskController,
  ],
  providers: [
    AbsentService,
    AdminService,
    AuthService,
    DataService,
    EmployeeService,
    TaskService,
    JwtStrategy,
  ],
})
export class AppModule {}
