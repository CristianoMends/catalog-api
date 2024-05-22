/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class ProductDto {
  
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    installment?: number = 1;

    image: string = null;

    userId: string

    constructor(
        name: string,
        description: string,
        price: number,
        category: string,
        installment:number
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.installment = installment;
    }

}

export class FindParams {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    @IsString()
    category?: string;

}