import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenRoleException extends HttpException {
  constructor(requiredRoles: string[]) {
    super(
      `Access denied. Required roles: ${requiredRoles.join(', ')}`,
      HttpStatus.FORBIDDEN,
    );
  }
}
