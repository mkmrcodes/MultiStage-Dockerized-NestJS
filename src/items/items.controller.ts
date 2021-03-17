import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('items')
@UseInterceptors(CacheInterceptor)
export class ItemsController {
  private logger = new Logger('ItemsController');
  constructor(private itemsService: ItemsService) {}

  @Get('/:id')
  getItemById(@Param('id', ParseIntPipe) id: string): Promise<Item> {
    return this.itemsService.getItemById(id);
  }

  @Get('/urls')
  getItemsWithUrl(
    @Query(ValidationPipe) getItemsFilterDto: GetItemsFilterDto,
  ): Promise<Item[]> {
    return this.itemsService.getItemsWithUrl(getItemsFilterDto);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.itemsService.deleteItem(id);
  }

  @Patch('/:id/update')
  updateItem(
    @Param('id') id: string,
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(id, createItemDto);
  }

  @Get('')
  async index(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 24,
  ): Promise<Pagination<Item>> {
    limit = limit > 24 ? 24 : limit;
    return this.itemsService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/items',
    });
  }
  @Get()
  getItems(
    @Query(ValidationPipe) getItemsFilterDto: GetItemsFilterDto,
  ): Promise<Item[]> {
    this.logger.verbose(
      `Retrieving all items. Filter: ${JSON.stringify(getItemsFilterDto)}`,
    );
    return this.itemsService.getItems(getItemsFilterDto);
  }
}
