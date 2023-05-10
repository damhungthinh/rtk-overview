import { Prisma } from '@prisma/client';
import { IsEmail, IsNumberString } from 'class-validator';

export class UserCondition {
  skip?: number;
  take?: number;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export class UserUniqueField {
  @IsNumberString()
  id: number;

  @IsEmail()
  email: string;
}

export class UserQueryParams {
  /**
   * text search
   */
  q: string;
}

export class UserRequest {
  @IsEmail()
  email: string;

  name: string;
}

export class UserEntity extends UserRequest {
  @IsNumberString()
  id?: number;
}
