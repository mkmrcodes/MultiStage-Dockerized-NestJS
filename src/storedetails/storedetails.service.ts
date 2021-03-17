import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoreDetailsDto } from './dto/create-storedetails.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { StoreDetails } from './storedetails.entity';
import { StoreDetailsRepository } from './storedetails.repository';

@Injectable()
export class StoreDetailsService {
  constructor(
    @InjectRepository(StoreDetailsRepository)
    private storeDetailsRepository: StoreDetailsRepository,
  ) {}

  async getStoreDetails(
    getStoreFilterDto: GetStoreFilterDto,
  ): Promise<StoreDetails[]> {
    return this.storeDetailsRepository.getStoreDetails(getStoreFilterDto);
  }
  async createStoreDetails(
    createStoreDetailsDto: CreateStoreDetailsDto,
  ): Promise<StoreDetails> {
    return this.storeDetailsRepository.createStoreDetails(
      createStoreDetailsDto,
    );
  }
}
