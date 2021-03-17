import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  productBarcode: string;
  @IsNotEmpty()
  productMainTitle: string;
  @IsNotEmpty()
  productKind: string;
  @IsNotEmpty()
  productSubKind: string;
  @IsNotEmpty()
  brandName: string;
  @IsNotEmpty()
  brandSubName: string;
  @IsNotEmpty()
  productImg: string;
}
