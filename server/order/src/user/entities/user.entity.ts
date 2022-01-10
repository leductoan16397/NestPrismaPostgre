import { Exclude } from 'class-transformer';
export class UserEntity {
  fullName: string;
  email: string;
  roles: string;
  id: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
