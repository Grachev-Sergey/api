import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
        type: 'varchar',
        nullable: true,
    })
    dob: string;

    @Column({
        unique: true,
        type: 'varchar',
        nullable: true,
    })
    email: string;

    @Column({
        select: false,
        type: 'varchar',
        nullable: true,
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};