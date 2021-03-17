import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  storeId: number;
  @IsNotEmpty()
  storeName: string;
}
