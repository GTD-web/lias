import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Employee } from '../../modules/domain/employee/employee.entity';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Employee;

    return data ? user?.[data] : user;
});
