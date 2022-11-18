import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad } from 'typeorm';
import { addUserUrl } from '../../utils/addUrl';
import { Cart } from './Cart';
import { Favorite } from './Favorite';
import { Rating } from './Rating';

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

  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.user)
  coart: Cart[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @AfterLoad()
  changingPathInResponse() {
    this.avatar = addUserUrl(this.avatar);
  }
}
