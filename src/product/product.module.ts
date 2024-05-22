/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { BadRequestException, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductEntity } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
require('dotenv').config()

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ProductEntity]),
    /*MulterModule.register({
      dest: './uploads/images',
      limits: {
        fileSize: 1024 * 1024 * 3, //maximo 3mb
      },
      fileFilter: (req, file, cb) => {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),*/
  ],
  exports:[ProductService],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {
}
