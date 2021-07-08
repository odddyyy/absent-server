import { Body, Controller, Post } from '@nestjs/common';
import { loginDTO } from 'src/shared/requestVM/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Login(@Body() payload: loginDTO) {
    return this.authService.Login(payload);
  }
}
