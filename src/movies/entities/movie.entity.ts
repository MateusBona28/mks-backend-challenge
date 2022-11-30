import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 90 })
  title: string;

  @Column({ type: 'integer' })
  duration: number;
}
