import { SetMetadata } from '@nestjs/common';

export const ADMIN_LEVEL_KEY = 'admin_level';
export const AdminLevel = (level: 'super' | 'admin') =>
SetMetadata(ADMIN_LEVEL_KEY, level);
