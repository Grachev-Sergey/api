import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Book } from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar' })
    name: string;
}
