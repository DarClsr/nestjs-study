import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}错误`)
    }

    // 这里的 value 就是传入的参数，如果不能转成数字，就返回参数错误，否则乘 10 再传入 

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
