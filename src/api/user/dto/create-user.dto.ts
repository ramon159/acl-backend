import { IsNotEmpty, min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
export enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
