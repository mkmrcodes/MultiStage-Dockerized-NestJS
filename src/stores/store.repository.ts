import { Logger } from '@nestjs/common';
import { EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './store.entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  private logger = new Logger('StoreRepo');
  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = new Store();
    const { storeId, storeName } = createStoreDto;
    store.storeId = storeId;
    store.storeName = storeName;

    await store.save();

    return store;
  }
}
