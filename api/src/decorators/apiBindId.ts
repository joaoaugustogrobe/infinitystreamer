import { ApiParam } from '@nestjs/swagger';

export const ApiBindId = (
  description = 'id',
  name = 'id',
  type = 'string',
  required = true,
  ...extra
) => ApiParam({ name, type, required, description, ...extra });
