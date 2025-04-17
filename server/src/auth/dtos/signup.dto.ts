import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { userRolesEnum } from 'src/db/schema/users';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(userRolesEnum.enumValues)
  role: (typeof userRolesEnum.enumValues)[number];
}
