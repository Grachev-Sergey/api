import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, ManyToMany, JoinTable } from 'typeorm';
import { addUrl } from '../../utils/addUrl';
import { Genre } from './Genre';

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

  @ManyToMany(() => Genre, (genre) => genre.id)
  @JoinTable()
    genre: Genre[];

  @Column({ type: 'varchar' })
    hardCover: boolean;

  @Column({ type: 'varchar', nullable: true })
    hardCoverPrice: string;

  @Column({ type: 'varchar' })
    paperback: boolean;

  @Column({ type: 'varchar', nullable: true })
    paperbackPrice: string;

  @Column({ type: 'varchar', nullable: true })
    status: string;

  @Column({ type: 'varchar', nullable: true })
    rating: string;

  @Column({ type: 'varchar', nullable: true })
    comments: string;

  @AfterLoad()
  changingPathInResponse() {
    this.cover = addUrl(this.cover);
  }
}
