import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'integer' })
    bookId: number;

  @Column({ type: 'integer' })
    userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
    book: Book;
}
