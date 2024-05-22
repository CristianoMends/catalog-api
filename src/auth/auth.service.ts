/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.login(email, pass)

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateToken(token: string): Promise<{ isValid: boolean | object }>{
    try {
      return {
        isValid: await this.jwtService.verifyAsync(token)
      }
    } catch (error) {
      console.error('Error validating the token', error);
      return { isValid: false };
    }
  }

}
