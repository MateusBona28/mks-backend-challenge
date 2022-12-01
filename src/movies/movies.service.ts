import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { title, duration } = createMovieDto;

    const movieAlreadyExists = await this.findOneByTitle(title);

    if (movieAlreadyExists) {
      throw new BadRequestException('movie already exists');
    }

    const movieData = {
      title,
      duration,
    };

    this.moviesRepository.create(movieData);
    const newMovie = await this.moviesRepository.save(movieData);

    return newMovie;
  }

  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: string) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    const validatedData = {
      ...movie,
      ...updateMovieDto,
    };

    const { title, duration } = validatedData;

    const updatedMovie = {
      id,
      title,
      duration,
    };

    await this.moviesRepository.update(id, updatedMovie);

    return updatedMovie;
  }

  async remove(id: string) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    await this.moviesRepository.delete({ id });
  }

  async findOneByTitle(title: string) {
    return await this.moviesRepository.findOneBy({ title });
  }
}
