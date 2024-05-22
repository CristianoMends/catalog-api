import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, isPhoneNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsOptional()
    @IsPhoneNumber('BR')
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    constructor(fullName: string, email: string, password: string, phone?: string, address?: string) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone || null;
        this.address = address || null;
    }
}
