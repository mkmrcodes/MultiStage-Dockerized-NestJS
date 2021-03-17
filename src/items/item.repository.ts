import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  private logger = new Logger('ItemsController');
  async getItems(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    const { search } = getItemsFilterDto;
    const query = this.createQueryBuilder('item');

    if (search) {
      query.andWhere('item.brandName LIKE :search', { search: `%${search}%` });
    }

    const items = await query.getMany();
    return items;
  }
  async getItemsWithUrl(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    const { barcode } = getItemsFilterDto;
    const query = this.createQueryBuilder('item');
    const items = await query
      .andWhere('item.productBarcode = :barcode', {
        barcode,
      })
      //.leftJoinAndSelect('item.storeDetails', 'storeDetails')
      .getMany();
    return items;
  }
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = new Item();
    const {
      productMainTitle,
      productKind,
      productSubKind,
      brandName,
      brandSubName,
      productImg,
      productBarcode,
    } = createItemDto;
    item.productMainTitle = productMainTitle;
    item.productKind = productKind;
    item.productSubKind = productSubKind;
    item.brandName = brandName;
    item.brandSubName = brandSubName;
    item.productImg = productImg;
    item.productBarcode = productBarcode;
    await item.save();
    return item;
  }
}
