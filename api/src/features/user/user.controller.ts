import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCondition, UserQueryParams, UserRequest } from './user.model';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUsers(@Query() query: UserQueryParams) {
    const { q } = query;
    const conditions = new UserCondition();
    if (q) {
      conditions.where = {
        OR: [{ name: { contains: q } }, { email: { contains: q } }],
      };
    }
    conditions.orderBy = {
      name: 'desc',
    };
    return this.userService.findByConditions(conditions);
  }

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.findByUnique({ id });
  }

  @Post()
  async createUser(@Body() data: UserRequest) {
    return this.userService.createUser(data);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() data: UserRequest) {
    return this.userService.updateUser({ ...data, id });
  }
}
