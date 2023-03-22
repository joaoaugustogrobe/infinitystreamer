import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class BindEntityPipe implements PipeTransform {
  constructor(@InjectConnection() private connection) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const repository = await this.connection.getRepository(metadata.metatype);
    const item = await repository.findOne({
      where: { [metadata.data]: value },
    });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }
}
