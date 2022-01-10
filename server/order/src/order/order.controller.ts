import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'auth/auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/auth/guards/roles.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderEntity } from './entities/order.entity';
import { IRequest } from 'common/interface/request.interface';
import { OrderStatus, Role } from '../../prisma/generated/prisma-client-js';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  create(@Req() req: IRequest, @Body() createOrderDto: CreateOrderDto) {
    const { user } = req;
    return this.orderService.create(user.id, createOrderDto);
  }

  @MessagePattern({ service: 'ORDER', action: 'payment-verified' })
  updateOrderStatusAfterVeridyPayent(
    @Payload() payload: { status: 'declined' | 'confirmed'; orderId: string },
  ) {
    this.orderService.updateOrderStatusAfterVeridyPayent(
      payload.orderId,
      payload.status,
    );
  }

  @Get()
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(Role.USER, Role.ADMIN)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findAll(@Req() req: IRequest) {
    const { user } = req;
    const orders = await this.orderService.findAll(user.id);
    return orders.map((order) => new OrderEntity(order));
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findOne(@Param('id') id: number, @Req() req: IRequest) {
    const { user } = req;
    const order = await this.orderService.findOne(id, user.id);
    return new OrderEntity(order);
  }

  @Patch(':id/cancle')
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Req() req: IRequest) {
    const { user } = req;
    return this.orderService.updateOderStatusByUser(
      user.id,
      id,
      OrderStatus.CANCELED,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
