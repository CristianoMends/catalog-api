/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { FindParams } from '../product/dto/create-product.dto';
import { PreviewCatalog } from './dto/preview.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}


  @Get(':userName')
  findAllProducts(
    @Query() params: FindParams,
    @Param('userName') userName:string
  ) {
    return this.catalogService.findAllProducts(params, userName);
  }
  @Get('user/:product_id')
  findSellerInfo(
    @Param('product_id') product_id:number
  ) {
    return this.catalogService.findByProductId(product_id);
  }

  @Get()
  getAllPreview():Promise<PreviewCatalog[]>{
    return this.catalogService.findAllCatalogs();
  }

}
