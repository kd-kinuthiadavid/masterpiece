import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { products } from 'src/db/schema/products';
import { users } from 'src/db/schema/users';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductsRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateProductDto & { vendorId: string }) {
    const [product] = await this.db.client
      .insert(products)
      .values({
        ...data,
        price: data.price.toString(),
      })
      .returning();
    return product;
  }

  async findAll() {
    return await this.db.client
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        vendor: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(products)
      .leftJoin(users, eq(products.vendorId, users.id));
  }
}
