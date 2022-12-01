import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/interfaces/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    const user = await this.usersService.findUserByUsername(username);

    if (user) {
      const validatePassword = await compare(password, user.password);

      if (validatePassword) {
        const payload: UserPayload = {
          sub: user.id,
          username: user.username,
        };

        const token = this.jwtService.sign(payload);

        return {
          token,
        };
      }
    }

    throw new UnauthorizedException('username or password are incorrect');
  }
}
