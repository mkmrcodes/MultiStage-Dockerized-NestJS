import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './store.entity';
import { StoresService } from './stores.service';

@Controller('stores')
@UseInterceptors(CacheInterceptor)
export class StoresController {
  private logger = new Logger('StoreController');
  constructor(private storesService: StoresService) {}

  @Get('/:id')
  getItemById(@Param('id', ParseIntPipe) id: number): Promise<Store> {
    this.logger.warn(`Store ${id} is retrieved`);
    return this.storesService.getStoreById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createItem(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.createStore(createStoreDto);
  }
}
