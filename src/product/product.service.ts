/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindParams, ProductDto } from './dto/create-product.dto';
import path, { join } from 'path';
import { createReadStream } from 'fs';
import { ProductEntity } from './entities/product.entity';
import * as fs from 'fs';
import { UsersService } from 'src/users/users.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { del, put } from '@vercel/blob';


@Injectable()
export class ProductService {
  private readonly uploadRoute = 'https://product-catalog-api-b046fe6ba2c3.herokuapp.com/product/image';

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly usersService: UsersService
  ) { }
  async save(productDto: ProductDto, image: Express.Multer.File) {
    if (!image.mimetype.startsWith('image/')) {
      throw new HttpException('Invalid file type. Only images are allowed.', HttpStatus.BAD_REQUEST);
    }

    const maxSize = 3 * 1024 * 1024;
    if (image.size > maxSize) {
      throw new HttpException('File too large. Maximum size is 3MB.', HttpStatus.BAD_REQUEST);
    }
    try {
      const name = productDto.name;
      const description = productDto.description;
      const price = productDto.price;
      const category = productDto.category;
      const installment = productDto.installment;
      const user = await this.usersService.findById(productDto.userId);

      const product = new ProductEntity(name, description, price, category, installment, user);
      product.image = '';

      const savedProduct = await this.productRepository.save(product);

      const userDir = productDto.userId; //pasta
      const fileName = `product-${savedProduct.product_id}.jpg`;  //passando parte q representa o nome do arquivo (.../product_id.png)

      const blob = await put(`${userDir}/${fileName}`, image.buffer, { //salvando a imagem no blob
        access: 'public',
        addRandomSuffix: false
      });

      const imageUrl = blob.url; // URL da imagem no Vercel Blob

      const saved = await this.productRepository.update(savedProduct.product_id, { image: imageUrl });

      return saved;
    } catch (error) {
      throw new HttpException(`error: fail to save product, ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  findByUser(id:string):Promise<string[]>{
    const images = this.productRepository.query(`
      select product.image from product
      inner join users
      on product."userId" = users.id
      where users.id = uuid'${id}'
      limit 3
      `);
      return images;
  }

  async findAll(params: FindParams, name: string): Promise<ProductEntity[]> {
    const productQuery = `
    SELECT p.* FROM product p
    inner join users u on u.id = p."userId"
    WHERE 
    LOWER(p.name) 		    LIKE LOWER('%${params.name || ''              }%')   AND
    LOWER(p.category) 	  LIKE LOWER('%${params.category || ''          }%')   AND
    LOWER(p.description)  LIKE LOWER('%${params.description || ''       }%')   AND
    LOWER(REPLACE(u."fullName", ' ', '_')) like '${name}'   
    ${(params.price) ? "AND price = " + params.price : "" }
  `;
    const productResult: ProductEntity[] =
      await this.productRepository.query(productQuery);

    return productResult;
  }


  async findOne(product_id: number): Promise<ProductEntity | null> {
    const productQuery = `
      SELECT * FROM product
      WHERE product_id = $1
    `;
    const productResult = await this.productRepository.query(productQuery, [product_id]);
    const product = productResult[0];
    return product
  }

  async delete(product_id: number): Promise<any> {
    try {

      const product = await this.productRepository.findOneBy({ product_id });
      const image = product.image

      if (product) {
        del(image)
        await this.productRepository.delete(product_id); // Remover produto do banco de dados
      } else {
        throw new NotFoundException(`Product with ID ${product_id} not found`);
      }

    } catch (error) {
      throw error
    }
  }

  async update(product_id: number, product: UpdateProductDto, file: Express.Multer.File): Promise<string> {
    const foundProduct = await this.productRepository.findOneBy({ product_id })

    if (!foundProduct) {
      throw new HttpException(`Product with id ${product_id} not found`, HttpStatus.BAD_REQUEST);
    }
    try {

      if (file && file.buffer) {
        const parts = product.image.split('/');
        const userDir = parts[parts.length - 2]; //pegando parte da pasta(user_name/...)
        const fileName = parts[parts.length - 1];//pegando parte q representa o nome do arquivo (.../product_id.png)

        const blob = await put(`${userDir}/${fileName}`, file.buffer, { //salvando no blob com o mesmo nome
          access: 'public',
          addRandomSuffix: false
        });
      }

      await this.productRepository.update(product_id, product);
      return `Product updated successfully`;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update product: ${error.message}`);
    }
  }

}