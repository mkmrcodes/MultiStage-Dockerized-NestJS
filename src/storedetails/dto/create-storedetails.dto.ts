import { IsNotEmpty } from 'class-validator';
import { Item } from 'src/items/item.entity';

export class CreateStoreDetailsDto {
  @IsNotEmpty()
  storeId: number;
  @IsNotEmpty()
  item: Item;
  @IsNotEmpty()
  productUrl: string;
  @IsNotEmpty()
  productPrice: number;
}
