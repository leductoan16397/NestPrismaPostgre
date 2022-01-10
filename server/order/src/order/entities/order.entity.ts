import { Exclude, Expose } from 'class-transformer';
import { ProductOrder } from 'order/schemas/order.schema';
import { User } from '../../../prisma/generated/prisma-client-js';

export class OrderEntity {
  address: string;
  totalPrice: number;
  status: string;
  products: ProductOrder[];
  createdAt: Date;
  id: number;

  @Exclude()
  userId: number | User;

  @Exclude()
  updatedAt: Date;

  @Expose()
  get author(): string {
    return this.userId.toString();
  }

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
