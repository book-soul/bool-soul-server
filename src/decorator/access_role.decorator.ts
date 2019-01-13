import { ReflectMetadata } from '@nestjs/common';
import { AuthorityConst } from '../const/authority.const';

export const AccessRole = (roles: AuthorityConst.Role | AuthorityConst.Role[]) => ReflectMetadata('accessRoles', roles);