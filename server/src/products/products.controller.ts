import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.VENDOR)
  @Post()
  async create(
    @Request()
    req: ExpressRequest & {
      user: { userId: string; email: string; role: string };
    },
  ) {
    const product = await this.productsService.create({
      ...req.body,
      vendorId: req.user.userId,
    });
    return product;
  }

  @Roles(Role.VENDOR)
  @Get()
  async findAll(@Request() req: ExpressRequest & { user: { userId: string } }) {
    const products = await this.productsService.findAll(req.user.userId);
    return products;
  }
}
