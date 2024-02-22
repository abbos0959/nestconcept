import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configservice: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ispublic = this.reflector.get('isPublicKey', context.getHandler());
    if (ispublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const autHeader = request.header('Authorization');

    return autHeader === 'salom';
  }
}
