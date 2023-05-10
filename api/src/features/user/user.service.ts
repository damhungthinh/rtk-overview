import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@prisma/client';
import {
  UserCondition,
  UserEntity,
  UserRequest,
  UserUniqueField,
} from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByUnique(
    userWhereUniqueInput: Partial<UserUniqueField>,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findByConditions(conditions: UserCondition): Promise<User[]> {
    const { skip, take, where, orderBy } = conditions;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createUser(data: UserRequest): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(data: UserEntity): Promise<User> {
    const { id, ...rest } = data;
    return this.prisma.user.update({
      data: rest,
      where: {
        id,
      },
    });
  }

  async deleteByUniqueFields(fields: UserUniqueField): Promise<User> {
    return this.prisma.user.delete({
      where: fields,
    });
  }
}
