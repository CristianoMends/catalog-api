/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, HttpCode, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create.auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get()
  validateToken(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];

    const isValid = this.authService.validateToken(token);
    if (isValid) {
      return { status: 'Token is valid' };
    } else {
      return HttpStatus.UNAUTHORIZED;
    }
  }

}
