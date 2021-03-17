import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetStoreFilterDto {
  @IsOptional()
  @IsNotEmpty()
  storeId: number;
  @IsOptional()
  @IsNotEmpty()
  barcode: string;
}
