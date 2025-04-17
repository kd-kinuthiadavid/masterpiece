import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const transaction = await this.db.client.transaction(async () => {
      try {
        const user = await this.usersService.getUserByEmail(loginDto.email);

        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const jwtPayload = {
          userId: user.id,
          email: user.email,
          role: user.role,
          sub: user.id,
        };

        const token = this.jwtService.sign(jwtPayload);

        return {
          status: 'success',
          code: 200,
          message: 'Login successful',
          data: {
            user,
            token,
          },
        };
      } catch (error) {
        throw new InternalServerErrorException('Failed to login');
      }
    });

    return transaction;
  }
}
