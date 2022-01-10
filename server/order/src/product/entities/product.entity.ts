import { Exclude } from 'class-transformer';

export class ProductEntity {
  name: string;
  image: string;
  price: number;
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
