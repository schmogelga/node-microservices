import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';
}