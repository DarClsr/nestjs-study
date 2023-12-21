
import { IsNotEmpty, IsString, length, Length, Matches } from "class-validator";
export class CreateUserDto {
    name:string
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 30)
    @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
        message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符'
    })
    name:string;
    @IsString()
    @IsNotEmpty()
    @Length(6, 30)
    password:string
}

export class LoginDto {
    @IsNotEmpty({
        message:"用户名称不能为空",
    })
    @Length(1,50,{
        message:"字符不能为0"
    })
    name:string;
    @Length(1,50,{
        message:"字符不能为0"
    })
    @IsNotEmpty({
        message:"密码不能为空"
    })
    password:string
}