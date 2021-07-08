// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Employee } from 'src/libs/entities/employee.entity';
// import { getConnection } from 'typeorm';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     console.log(roles);
//     if (!roles) {
//       return false;
//     }
//     const request = context.switchToHttp().getRequest();
//     await getConnection().transaction(async (transaction) => {
//       const user = await transaction.findOne(Employee, {
//         where: { employee_id: request.user.employee_id },
//         relations: ['role'],
//         select: ['role'],
//       });
//       return roles.some((role) => {
//         return role === user.role.name;
//       });
//     });
//   }
// }
