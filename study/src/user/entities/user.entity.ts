import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        comment:"姓名",
        length:100
    })
    name:string
}
