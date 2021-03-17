import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      ttl: 3,
    }),
    TypeOrmModule.forFeature([StoreRepository]),
  ],
  controllers: [StoresController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    StoresService,
  ],
})
export class StoresModule {}
