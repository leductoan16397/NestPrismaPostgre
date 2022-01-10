import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { hashSync } from 'bcrypt-nodejs';

@Injectable()
export class UserPrismaMiddleware {
    @OnEvent('User.before.create')
    async testCreate(payload: any, next: any) {
        console.log('before');
        const hashed = hashSync(payload.args.data['password']);
        payload.args.data['password'] = hashed;
    }

    @OnEvent('User.after.create')
    async testUpdated(payload: any, response: any) {
        console.log('after');
    }
}