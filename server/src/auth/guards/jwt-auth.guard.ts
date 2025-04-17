import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthGuard.name);
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    if (info && Object.keys(info).length !== 0) {
      this.logger.debug(`JwtAuthGuard: Info: ${JSON.stringify(info)}`, {
        context: {
          info,
        },
      });

      if (info.name.includes('JsonWebTokenError')) {
        throw new UnauthorizedException('Invalid token', {
          cause: info,
          description: info.message,
        });
      }

      if (info.name.includes('TokenExpiredError')) {
        throw new UnauthorizedException('Token expired', {
          cause: info,
          description: info.message,
        });
      }

      throw new UnauthorizedException('Invalid token', {
        cause: info,
        description: info.message,
      });
    }

    if (err || !user) {
      this.logger.error(
        `JwtAuthGuard: Error or user not found: ${err} ${user}`,
        {
          context: {
            err,
            user,
            info,
          },
        },
      );
      throw new UnauthorizedException();
    }
    return user;
  }
}
