/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProductModule, UsersModule],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
