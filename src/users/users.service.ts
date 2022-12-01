import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const userAlreadyExists = await this.findUserByUsername(username);

    if (userAlreadyExists) {
      throw new BadRequestException('user already exists.');
    }

    const hashedPassword = await hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
    };

    this.usersRepository.create(user);
    const newUser = await this.usersRepository.save(user);

    return {
      ...newUser,
      password: undefined,
    };
  }

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }
}
