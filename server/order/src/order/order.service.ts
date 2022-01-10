import { NotAcceptableException } from '@nestjs/common';
import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  OrderStatus,
  Order,
} from '../../prisma/generated/prisma-client-js/index';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    @Inject('PAYMENT_SERVICE') private PaymentService: ClientProxy,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    try {
      const order = await this.prisma.order.create({
        data: {
          userId,
          address: createOrderDto.address,
          totalPrice: createOrderDto.products.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.count * currentValue.price,
            0,
          ),
          products: { create: createOrderDto.products },
        },
        include: { products: true },
      });
      this.PaymentService.emit(
        { service: 'PAYMENT', action: 'verify' },
        { orderId: order.id },
      );
      return { data: 'Create order successfully' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateOrderStatusAfterVeridyPayent(
    orderId: string,
    status: 'declined' | 'confirmed',
  ) {
    const STATUSMAP: {
      declined: Partial<OrderStatus>;
      confirmed: Partial<OrderStatus>;
    } = { declined: OrderStatus.CANCELED, confirmed: OrderStatus.CONFIRMED };

    await this.updateOderStatus(
      orderId as unknown as number,
      STATUSMAP[status],
    );
    if (status === 'confirmed') {
      setTimeout(() => {
        this.updateOderStatus(
          orderId as unknown as number,
          OrderStatus.DELIVERED,
        );
      }, 2 * 60 * 1000);
    }
  }

  async updateOderStatus(orderId: number, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });
    if (!order) {
      throw new BadGatewayException('Order does not exist');
    }
    if (
      order.status === OrderStatus.CREATED ||
      order.status === OrderStatus.CONFIRMED
    ) {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
      return { data: 'Cancele order successfully' };
    }
    return;
  }

  async updateOderStatusByUser(
    userId: number,
    orderId: number,
    status: OrderStatus,
  ) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });
    if (!order) {
      throw new BadGatewayException('Order does not exist');
    }
    if (
      order.status === OrderStatus.CANCELED ||
      order.status === OrderStatus.DELIVERED
    ) {
      throw new NotAcceptableException("Can't update");
    }
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return { data: 'Cancele order successfully' };
  }

  async findAll(userId: number): Promise<any[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        products: {
          select: { count: true, image: true, name: true, price: true },
        },
      },
    });
    const newOrders = orders.map((item: Order) => {
      return { ...item, status: item.status.toLocaleLowerCase() };
    });
    return newOrders;
  }

  async findOne(id: number, userId: number): Promise<Order> {
    const order = await this.prisma.order.findFirst({ where: { id, userId } });
    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
