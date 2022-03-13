import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login-user.dto';
import { User } from 'src/common/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
interface IRequestAuth {
  user: Partial<User>;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() login: LoginDto, @Request() req: IRequestAuth) {
    return this.authService.login(req.user);
  }
}
