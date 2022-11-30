import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = {
      username,
      password,
    };

    this.usersRepository.create(user);
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }
}
