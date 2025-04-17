import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createProductDto: CreateProductDto & { vendorId: string }) {
    // Verify that the vendor exists
    const [vendor] = await this.usersRepository.getUserById(
      createProductDto.vendorId,
    );

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return this.productsRepository.create({
      ...createProductDto,
      vendorId: vendor.id,
    });
  }

  async findAll() {
    return this.productsRepository.findAll();
  }
}
