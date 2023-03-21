import { Param, PipeTransform } from '@nestjs/common';
import { BindEntityPipe } from '../pipes/bindEntityPipe';
import { Type } from '@nestjs/common/interfaces';

export const BindParam = (
  param: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) => Param(param, BindEntityPipe, ...pipes);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const BindParam = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const { params } = request;
//     console.log('BindParam', data, ctx);
//     // return request.user;
//     return data;
//   },
// );
