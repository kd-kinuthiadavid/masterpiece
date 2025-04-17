import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, UsersRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
