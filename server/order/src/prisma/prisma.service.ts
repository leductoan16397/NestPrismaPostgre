import { INestApplication, Injectable, OnModuleInit, HttpException } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/prisma-client-js';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaEventDispatcher, PrismaEventDispatcherOptions } from 'prisma-event-dispatcher';
import { hashSync } from 'bcrypt-nodejs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private eventEmmiter: EventEmitter2) {
    super();

    const options: PrismaEventDispatcherOptions = {
      models: ['User'],
      actions: ['findUnique', 'findMany', 'findFirst', 'create', 'createMany', 'update', 'updateMany', 'upsert', 'delete', 'deleteMany', 'executeRaw', 'queryRaw', 'aggregate', 'count'],
      when: ['before', 'after']
    }

    this.$use(async (params, next) => {
      return await PrismaEventDispatcher.setup(options, this.eventEmmiter).dispatch(params, next);
    });
  }
  async onModuleInit() {
    await this.$connect();
  }


  // @OnEvent('User.before.create')
  // async testCreate(payload: any, next: any) {
  //   console.log('before');
  //   const hashed = hashSync(payload.args.data['password']);
  //   payload.args.data['password'] = hashed;
  // }

  // @OnEvent('User.after.create')
  // async testUpdated(payload: any, response: any) {
  //   console.log('after');
  // }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
