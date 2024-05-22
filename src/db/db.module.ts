/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }, //remover linha para uso com banco de dados local
            entities: [ ProductEntity, UserEntity],
            synchronize: false,
            autoLoadEntities: true
        }),
    ]
})
export class DbModule {}//
