import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    try {
      const allUsers = await this.usersRepository.findAll();
      return allUsers;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.getUserByEmail(email);
      return user[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      const existingUser = await this.getUserByEmail(user.email);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const newUser = await this.usersRepository.createUser(user);
      return newUser[0];
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
