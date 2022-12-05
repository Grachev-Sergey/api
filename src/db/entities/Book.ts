import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, ManyToMany, JoinTable, OneToMany } from 'typeorm';
// import * as typeOrm from 'typeorm';

import { Comment } from './Comments';
import { Genre } from './Genre';

import { addUrl } from '../../utils/addUrl';

// typeOrm.Entity();
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

  @ManyToMany(() => Genre, (genre) => genre.id, {
    eager: true,
  })
  @JoinTable()
  genre: Genre[];

  @AfterLoad()
  changingPathInResponse() {
    this.cover = addUrl(this.cover, 'booksCover');
  }
}
