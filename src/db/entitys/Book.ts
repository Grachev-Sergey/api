import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Comment } from './Comments';
import { Genre } from './Genre';

import { addBookUrl } from '../../utils/addUrl';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar' })
    cover: string;

  @Column({ type: 'varchar' })
    title: string;

  @Column({ type: 'varchar' })
    author: string;

  @Column({ type: 'varchar' })
    description: string;

  @Column({ type: 'varchar' })
    dateOfIssue: string;

  @ManyToMany(() => Genre, (genre) => genre.id, {
    eager: true,
  })
  @JoinTable()
    genre: Genre[];

  @Column({ type: 'boolean' })
    hardCover: boolean;

  @Column({ type: 'float', nullable: true })
    hardCoverPrice: number;

  @Column({ type: 'boolean' })
    paperback: boolean;

  @Column({ type: 'float', nullable: true })
    paperbackPrice: number;

  @Column({ type: 'varchar', nullable: true })
    status: string;

  @Column({ type: 'float' })
    rating: number;

  @OneToMany(() => Comment, (comment) => comment.book)
    comments: Comment[];

  @AfterLoad()
  changingPathInResponse() {
    this.cover = addBookUrl(this.cover);
  }
}
