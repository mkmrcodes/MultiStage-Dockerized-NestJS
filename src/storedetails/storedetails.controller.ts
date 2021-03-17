import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStoreDetailsDto } from './dto/create-storedetails.dto';
import { GetStoreFilterDto } from './dto/get-store-filter.dto';
import { StoreDetails } from './storedetails.entity';
import { StoreDetailsService } from './storedetails.service';

@Controller('storedetails')
export class StoreDetailsController {
  constructor(private storeDetailsService: StoreDetailsService) {}

  @Get('/')
  getStoreDetails(
    @Query(ValidationPipe) getStoreFilterDto: GetStoreFilterDto,
  ): Promise<StoreDetails[]> {
    return this.storeDetailsService.getStoreDetails(getStoreFilterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStoreDetails(
    @Body() createStoreDetailsDto: CreateStoreDetailsDto,
  ): Promise<StoreDetails> {
    return this.storeDetailsService.createStoreDetails(createStoreDetailsDto);
  }
}
