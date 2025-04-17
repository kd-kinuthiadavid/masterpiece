import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from '../dtos/signup.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SignupService {
  constructor(
    private readonly usersService: UsersService,
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const transaction = await this.db.client.transaction(async () => {
      try {
        const user = await this.usersService.createUser(signupDto);

        const jwtPayload = {
          userId: user.id,
          email: user.email,
          role: user.role,
          sub: user.id,
        };

        const token = this.jwtService.sign(jwtPayload);

        return {
          status: 'success',
          code: 201,
          message: 'User created successfully',
          data: {
            user,
            token,
          },
        };
      } catch (error) {
        throw new InternalServerErrorException('Failed to create user');
      }
    });

    return transaction;
  }
}
