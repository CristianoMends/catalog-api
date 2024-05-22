/* eslint-disable prettier/prettier */
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique:true})
    fullName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @OneToMany(() => ProductEntity, product => product.user)
    products: ProductEntity[];

    constructor(
        fullName: string  = null,
        email: string  = null,
        password: string  = null,
        phone: string  = null,
        address: string = null,
        products:ProductEntity[] = null
    ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.products = products
    }
}
