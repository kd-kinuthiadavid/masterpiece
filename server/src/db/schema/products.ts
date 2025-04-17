import {
  uuid,
  pgTable,
  text,
  numeric,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: numeric('price').notNull(),
    vendorId: uuid('vendor_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [
    index('products_vendor_id_idx').on(table.vendorId),
    index('products_name_idx').on(table.name),
    index('products_id_idx').on(table.id),
  ],
);
