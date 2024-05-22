/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Request, Delete, Put, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';


@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);

      return res.status(HttpStatus.CREATED).json({
        message: "User created successfully",
        userId: user.id
      });
    } catch (error) {

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error creating user",
        error: error.message
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    const userId: string = req.user.sub
    return this.usersService.findById(userId);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ) {
    const userId: string = req.user.sub
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Request() req) {
    const userId: string = req.user.sub
    return this.usersService.delete(userId);
  }
}

