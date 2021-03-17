import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class GetItemsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsNotEmpty()
  barcode: string;
}
