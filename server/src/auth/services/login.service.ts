import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from '../dtos/login.dto';
@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly db: DatabaseService,
  ) {}

  async login(loginDto: LoginDto) {
    const transaction = await this.db.client.transaction(async () => {
      try {
        const user = await this.usersService.getUserByEmail(loginDto.email);

        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }

        return user;
      } catch (error) {
        throw new InternalServerErrorException('Failed to login');
      }
    });

    return transaction;
  }
}
