import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { eq } from 'drizzle-orm';
import { users } from 'src/db/schema/users';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.client.select().from(users);
  }

  async getUserByEmail(email: string) {
    return this.db.client.select().from(users).where(eq(users.email, email));
  }

  async createUser(user: CreateUserDto) {
    return this.db.client.insert(users).values(user).returning();
  }

  async getUserById(id: string) {
    return this.db.client.select().from(users).where(eq(users.id, id));
  }
}
