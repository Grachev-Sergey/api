import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
  })
    name: string;

  @Column({
    type: 'varchar',
  })
    author: string;

  @Column({
    type: 'varchar',
  })
    description: string;

  @Column({
    type: 'varchar',
  })
    dateOfIssue: string;

  @Column({
    type: 'varchar',
  })
    genre: string;

  @Column({
    type: 'varchar',
  })
    hardCoverPrice: string;

  @Column({
    type: 'varchar',
  })
    paperback: boolean;

  @Column({
    type: 'varchar',
  })
    aperbackPrice: string;

  @Column({
    type: 'varchar',
  })
  rating: string;

  @Column({
    type: 'varchar',
  })
    comments: string;
}
