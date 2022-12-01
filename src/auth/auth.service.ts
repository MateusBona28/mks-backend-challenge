import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/interfaces/UserPayload';
import Redis, { Redis as IRedis } from 'ioredis';

@Injectable()
export class AuthService {
  private redisClient: IRedis;

  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.redisClient = new Redis({
      host: 'redis',
      port: 6379,
      password: '1234',
    });
  }

  async validateUser(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    const user = await this.usersService.findUserByUsername(username);

    if (user) {
      const validatePassword = await compare(password, user.password);

      if (validatePassword) {
        const redisToken = await this.redisClient.get(`token-${user.id}`);
        if (redisToken) {
          const token = JSON.parse(redisToken);

          const jwtDecoded: any = this.jwtService.decode(token.token);

          const expirationTime = jwtDecoded.exp * 1000;

          const dateNow = new Date();

          const timestampNow = dateNow.getTime();

          if (timestampNow < expirationTime) {
            return token;
          }
        }

        const payload: UserPayload = {
          sub: user.id,
          username: user.username,
        };

        const token = this.jwtService.sign(payload);

        await this.redisClient.set(
          `token-${payload.sub}`,
          JSON.stringify({ token }),
        );

        return {
          token,
        };
      }
    }

    throw new UnauthorizedException('username or password are incorrect');
  }
}
