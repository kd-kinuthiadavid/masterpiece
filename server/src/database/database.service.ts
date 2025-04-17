import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_CONNECTION') private db: PostgresJsDatabase) {}
  get client() {
    return this.db;
  }
}
