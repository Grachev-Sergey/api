import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar' })
    title: string;

  @ManyToMany(() => Book, (book) => book.genre)
  @JoinTable()
    genre: Genre[];
}
