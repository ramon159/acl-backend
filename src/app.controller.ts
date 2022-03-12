import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './common/dtos/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() req: LoginDto) {
    return req.username;
  }
}
