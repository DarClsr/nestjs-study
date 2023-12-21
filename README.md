# nestjs-study
深入学习nestjs

# nest generate module aaa  

新建一个模块


# nest g resource person 

快速生成person模块的crud代码

#  @Global()

将某一个模块设置成全局 然后导出 既可以全局使用

@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports:[AaaService]
})

# provide 

三种方式
 providers: [
    AppService,
    // 命名写法  provide 表示名称  useclass 表示注入的类
    // 通过 provide 指定 token，通过 useClass 指定对象的类，Nest 会自动对它做实例化后用来注入。
    {
      provide: PersonService,
      useClass: PersonService,
    },
    {
      provide: "user",
      useClass: UserService,
    },
    {
      provide:"value",
      useValue:{
        name:"iwan",
        age:53,
        render(){
          console.log(this.name)
        }
      }
    }
]


#  nest g middleware log   

生成中间件

# nest g guard login 

生成守卫


# nest g interceptor time 

生成路由拦截器

后面我们会在 controller 和 handler 上加一些 metadata，这种就只有 interceptor或者 guard 里可以取出来，middleware 不行。


# nest g pipe validate

创建一个管道

 Pipe 是管道的意思，用来对参数做一些检验和转换：

# decorator  装饰器 


  @Module： 声明 Nest 模块
  @Controller：声明模块里的 controller
  @Injectable：声明模块里可以注入的 provider
  @Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
  @Optional：声明注入的 provider 是可选的，可以为空
  @Global：声明全局模块
  @Catch：声明 exception filter 处理的 exception 类型
  @UseFilters：路由级别使用 exception filter
  @UsePipes：路由级别使用 pipe
  @UseInterceptors：路由级别使用 interceptor
  @SetMetadata：在 class 或者 handler 上添加 metadata
  @Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明 get、post、put、delete、patch、options、head 的请求方式
  @Param：取出 url 中的参数，比如 /aaa/:id 中的 id
  @Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
  @Body：取出请求 body，通过 dto class 来接收
  @Headers：取出某个或全部请求头
  @Session：取出 session 对象，需要启用 express-session 中间件
  @HostParm： 取出 host 里的参数
  @Req、@Request：注入 request 对象
  @Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定 passthrough 为true
  @Next：注入调用下一个 handler 的 next 方法
  @HttpCode： 修改响应的状态码
  @Header：修改响应头
  @Redirect：指定重定向的 url
  @Render：指定渲染用的模版引擎

  # nest g decorator aaa 

  自定义装饰器
e

  # sql  
  这里简单说一下 sql 的分类，sql 是分为好几种的，这种创建数据库、创建表等修改结构的 sql 叫做 DDL（Data Definition Language），而增删改那种叫做 DML（Data Manipulate Language），查询数据的叫做 DQL（Data Query Language）




# sql 增加

INSERT INTO `test`.`student` (`name`, `age`, `sex`, `email`, `create_time`) VALUES ('tom', '23', '1', 'bbb@qq.com', '2023-05-27 10:50:00');

# sql 查询

SELECT * FROM test.student;


# sql 修改

UPDATE `test`.`student` SET `name` = 'chis', `age` = '18', `email` = 'ffff@qq.com' WHERE (`id` = '5');

# sql 删除

DELETE FROM `test`.`student` WHERE (`id` = '10');



