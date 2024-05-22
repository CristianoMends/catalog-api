/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10)
      userData.password = hashedPassword;

      const savedUser = await this.userRepository.save(userData);
      return savedUser;
    } catch (error) {
      throw new Error(`Failed to create user, ${error}`);
    }
  }

  async findUserByProductId(productId: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.fullName', 'user.email', 'user.phone', 'user.address'])
      .innerJoin('user.products', 'product')
      .where('product.product_id = :productId', { productId })
      .getOne();

    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {

      const userQuery = `
        SELECT id, "fullName", email, phone, address FROM users
        WHERE id = uuid'${id}'
      `;
      const user: UserEntity[] = await this.userRepository.query(userQuery);

      if (user.length === 0) {
        return null;
      }

      const productsQuery = `
        SELECT p.* FROM product p
        INNER JOIN users u ON u.id = p."userId"
        WHERE u.id = uuid'${id}'
      `;
      const productsUser = await this.userRepository.query(productsQuery);

      user[0].products = productsUser;

      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll(){
    return this.userRepository.find();
  }



  async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException(`User not found with email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid password for user with email: ${email}`);
    }

    return user;
  }


  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.findById(user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    Object.assign(user, updateUserDto);
    this.create(user);
    return `User with ID:${user.id} Updated sucessfull`;
  }


  async delete(userId: string): Promise<string> {
    try {
      const result = await this.userRepository.delete(userId);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
      return `User with id: ${userId} Deleted`
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
