import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        comment:"姓名",
        length:100
    })
    name:string

    @Column({
        comment:"密码",
        length:100
    })
    password:string

    @CreateDateColumn({
        comment: '创建时间'
    })
    createTime: Date;

    @UpdateDateColumn({
        comment: '更新时间'
    })
    updateTime: Date;
    // @CreateDateColumn 会在第一次保存的时候设置一个时间戳，之后一直不变。
    // 而 @UpdateDateColumn 则是每次更新都会修改这个时间戳。

    @ManyToMany(()=>Permission)
    @JoinTable({
        name: 'user_permission_relation'
    })
    permissions:Permission[]


    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_role_relation'
    })
    roles: Role[] 
}



