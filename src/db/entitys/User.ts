import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
    fullName: string;

  @Column({
    unique: true,
    type: 'varchar',
    nullable: false,
  })
    email: string;

  @Column({
    select: false,
    type: 'varchar',
    nullable: false,
  })
    password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
    avatar: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
