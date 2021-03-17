import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreDetailsController } from './storedetails.controller';
import { StoreDetailsRepository } from './storedetails.repository';
import { StoreDetailsService } from './storedetails.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreDetailsRepository])],
  controllers: [StoreDetailsController],
  providers: [StoreDetailsService],
})
export class StoreDetailsModule {}
