import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from '../dtos/signup.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SignupService {
  constructor(
    private readonly usersService: UsersService,
    private readonly db: DatabaseService,
  ) {}

  async signup(signupDto: SignupDto) {
    const transaction = await this.db.client.transaction(async () => {
      try {
        const user = await this.usersService.createUser(signupDto);
        return user;
      } catch (error) {
        throw new InternalServerErrorException('Failed to create user');
      }
    });

    return transaction;
  }
}
