import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreRepository)
    private storeRepository: StoreRepository,
  ) {}
  async getStoreById(id: number): Promise<Store> {
    const found = await this.storeRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }
    return found;
  }
  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeRepository.createStore(createStoreDto);
  }
}
