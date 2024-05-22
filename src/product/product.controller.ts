/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Request, NotFoundException, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FindParams, ProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() productDto: ProductDto,
        @UploadedFile('file') file: Express.Multer.File,
        @Request() req
    ) {
        productDto.userId = req.user.sub
        console.log('created product:', productDto);
        return await this.productService.save(productDto, file);
    }

    @Get(':product_id')
    @UseGuards(AuthGuard)
    async getById(@Param('product_id') product_id: number) {
        const product = await this.productService.findOne(product_id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    @Get()
    @UseGuards(AuthGuard)
    async findByParameters(
        @Query() params: FindParams,
        @Request() req
    ): Promise<ProductEntity[]> {
        const userId = req.user.sub
        return this.productService.findAll(params, userId)
    }

    @UseGuards(AuthGuard)
    @Delete(':product_id')
    async delete(@Param('product_id') product_id: number) {
        return this.productService.delete(product_id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: number,
        @Body() product: UpdateProductDto,
        @UploadedFile('file') file: Express.Multer.File,
    ) {
        await this.productService.update(id, product, file)
    }
}
