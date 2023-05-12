import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique( [ 'username' ] )
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

// TODO: separar databases