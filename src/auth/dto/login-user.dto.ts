import { IsNotEmpty } from 'class-validator';
import { User } from 'src/common/entities/user.entity';
export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
