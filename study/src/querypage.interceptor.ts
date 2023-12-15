import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class QuerypageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.getHandler())


    // 后面我们会在 controller 和 handler 上加一些 metadata，这种就只有 interceptor或者 guard 里可以取出来，middleware 不行。
    let startTime=Date.now()
    // Pipe 是管道的意思，用来对参数做一些检验和转换：
    return next.handle().pipe(
       tap(()=>{
          console.log('time: ', Date.now() - startTime)
       })
    );
  }
}
