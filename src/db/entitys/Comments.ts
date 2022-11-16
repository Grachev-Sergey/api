import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'integer' })
    bookId: number;

  @Column({ type: 'integer' })
    userId: number;

  @Column({ type: 'varchar' })
    comment: string;

  @CreateDateColumn()
    createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
    book: Book;
}
