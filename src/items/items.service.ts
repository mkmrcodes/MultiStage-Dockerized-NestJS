import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}
  async paginate(options: IPaginationOptions): Promise<Pagination<Item>> {
    return paginate<Item>(this.itemRepository, options);
  }
  async getItemById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }
    return found;
  }
  async getItemsWithUrl(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    return this.itemRepository.getItemsWithUrl(getItemsFilterDto);
  }
  async getItems(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    return this.itemRepository.getItems(getItemsFilterDto);
  }
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItem(createItemDto);
  }
  async deleteItem(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }
  }
  async updateItem(id: string, createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.getItemById(id);
    const updated = Object.assign(item, createItemDto);
    await updated.save();
    return updated;
  }
}
