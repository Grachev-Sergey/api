import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'varchar' })
    genre: string[];

  @Column({ type: 'varchar', nullable: true })
    hardCoverPrice: string;

  @Column({ type: 'varchar' })
    paperback: boolean;

  @Column({ type: 'varchar', nullable: true })
    aperbackPrice: string;

  @Column({ type: 'varchar', nullable: true })
    status: string;

  @Column({ type: 'varchar', nullable: true })
    rating: string;

  @Column({ type: 'varchar', nullable: true })
    comments: string;
}
