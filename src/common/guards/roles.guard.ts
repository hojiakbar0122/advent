import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_LEVEL_KEY } from '../decorators/admin-level.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    

    const level = this.reflector.getAllAndOverride<'super' | 'admin'>(
      ADMIN_LEVEL_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!level) {
      return true; // Ruxsat darajasi belgilanmagan bo‘lsa, o'tkazamiz
    }

    if (!user || typeof user.is_creator !== 'boolean') {
      throw new ForbiddenException('Foydalanuvchi aniqlanmadi yoki noto‘g‘ri');
    }

    // Tekshirish
    if (level === 'super' && user.is_creator !== true) {
      throw new ForbiddenException('Faqat SuperAdmin kirishi mumkin');
    }

    if (level === 'admin' && user.is_creator !== false) {
      throw new ForbiddenException('Faqat Oddiy admin kirishi mumkin');
    }

    return true;
  }
}
