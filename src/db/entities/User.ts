import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad } from 'typeorm';

import { Cart } from './Cart';
import { Favorite } from './Favorite';
import { Rating } from './Rating';

import { addUrl } from '../../utils/addUrl';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  email: string;

  @Column({ select: false, type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @AfterLoad()
  changingPathInResponse() {
    this.avatar = addUrl(this.avatar, 'avatars');
  }
}
