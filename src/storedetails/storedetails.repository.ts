import { EntityRepository, Repository } from 'typeorm';
import { CreateStoreDetailsDto } from './dto/create-storedetails.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { StoreDetails } from './storedetails.entity';

@EntityRepository(StoreDetails)
export class StoreDetailsRepository extends Repository<StoreDetails> {
  async getStoreDetails(
    getStoreFilterDto: GetStoreFilterDto,
  ): Promise<StoreDetails[]> {
    const { storeId, barcode } = getStoreFilterDto;
    const query = this.createQueryBuilder('details');

    if (storeId) {
      query.andWhere('details.storeId = :storeId', {
        storeId,
      });
    }
    if (barcode) {
      query.andWhere('details.productBarcode = :barcode', {
        barcode,
      });
    }

    const details = await query.getMany();
    return details;
  }

  async createStoreDetails(
    createStoreDetailsDto: CreateStoreDetailsDto,
  ): Promise<StoreDetails> {
    const storeDetails = new StoreDetails();
    const { storeId, item, productUrl, productPrice } = createStoreDetailsDto;
    storeDetails.storeId = storeId;
    storeDetails.item = item;
    storeDetails.productUrl = productUrl;
    storeDetails.priceDate = new Date();
    storeDetails.productPrice = productPrice;
    await storeDetails.save();
    return storeDetails;
  }
}
