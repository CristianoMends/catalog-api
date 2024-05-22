import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    image: string;

    constructor(
        name?: string,
        description?: string,
        price?: number,
        category?: string,
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
