import { Module, Logger, Global } from '@nestjs/common';
import postgres from 'postgres';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        const dbURL = configService.get('DATABASE_URL');
        logger.log(`Connecting to the database ...`);
        logger.log('---- DATABASE_URL ----', dbURL);
        if (!dbURL) {
          logger.error(
            `Error connecting to the database. DATABASE_URL is not set or has been misconfigured. Got ${dbURL}`,
          );
          throw new Error('DATABASE_URL is not set');
        }
        const client = postgres(dbURL, { prepare: false });
        const db = drizzle({ client, casing: 'snake_case' });
        logger.log(`Successfully connected to the database!`);
        return db;
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: ['DATABASE_CONNECTION', DatabaseService],
})
export class DatabaseModule {}
