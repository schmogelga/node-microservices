import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    username: string = "";

    @Column()
    email: string = "";

    @Column()
    password: string = "";
}