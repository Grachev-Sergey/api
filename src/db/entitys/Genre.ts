import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar' })
    name: string;
}
