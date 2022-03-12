import { Injectable } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    const user = await this.userService.findOneAsync(username);
    console.log(user);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
