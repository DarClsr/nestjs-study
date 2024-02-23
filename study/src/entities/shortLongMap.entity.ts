import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShortLongMap {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 10,
        comment: '短链接'
    })
    shortUrl: string;

    @Column({
        comment: '长连接'
    })
    longUrl: string;


    @CreateDateColumn()
    createTime: Date;
}
