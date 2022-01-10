import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Product } from '../../prisma/generated/prisma-client-js';
import { UpdateProductDto } from './dto/update-product.dto';
import { products } from './products';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: Prisma.ProductCreateInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  async createMany(): Promise<Prisma.BatchPayload> {
    const createProductDto: Prisma.ProductCreateInput[] = products;
    const product = await this.prisma.product.createMany({
      data: createProductDto,
    });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    await this.prisma.product.delete({ where: { id } });
    return `remove product ${id} successfully`;
  }
}
