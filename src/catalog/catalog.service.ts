/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { FindParams } from '../product/dto/create-product.dto';
import { ProductService } from '../product/product.service';
import { ViewCatalogDto } from './dto/view-catalog.dto';
import { ProductEntity } from '../product/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PreviewCatalog } from './dto/preview.dto';

@Injectable()
export class CatalogService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {
  }

  findByProductId(product_id: number) {
    return this.userService.findUserByProductId(product_id);
  }
  async findAllCatalogs(): Promise<PreviewCatalog[]> {
    const users = await this.userService.findAll(); // Espera a lista de usuários
    const previews = await Promise.all(users.map(async (user) => {
      return await this.toCatalogView(user); // Espera cada toCatalogView
    }));
    return previews;
  }
  
  async findAllProducts(params: FindParams, name: string) {
    const products: Promise<ProductEntity[]> = this.productService.findAll(params, name)
    return (await products).map(product => this.toProductView(product));

  }
  private toProductView(product: any): ViewCatalogDto {
    return {
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      installment:product.installment,
      image: product.image,
    };
  }
  private async toCatalogView(user: UserEntity): Promise<PreviewCatalog> {
    const images = await this.productService.findByUser(user.id); // Espera as imagens serem retornadas
    return {
      link: `catalog/${user.fullName.replace(/ /g, '_').toLowerCase()}`,
      name: user.fullName,
      productImages: images
    };
  }
  
}
