/* eslint-disable prettier/prettier */
import { UserEntity } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('identity')
    product_id: number;

    @Column({ type: 'varchar'})
    name: string = null;

    @Column({ type: 'varchar'})
    description: string = null;

    @Column({ type: 'float'})
    price: number = null;

    @Column({ type: 'varchar'})
    category: string = null;

    @Column({type: 'varchar'})
    image: string = null

    @Column({type:'integer'})
    installment:number = 1

    @ManyToOne(() => UserEntity, user => user.products)
    public user: UserEntity;

    constructor(
        name: string = null,
        description: string = null,
        price: number = null,
        category: string = null,
        installment: number = 1,
        user:UserEntity = null,
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.user = user,
        this.installment = installment;
    }
}
