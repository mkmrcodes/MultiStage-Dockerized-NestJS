import { Item } from 'src/items/item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StoreDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  storeId: number;
  @ManyToOne(() => Item, (item: Item) => item.storeDetails)
  @JoinColumn({ name: 'productBarcode' })
  item: Item;
  @Column({ type: 'character varying', length: 250 })
  productUrl: string;
  @Column({ type: 'timestamp' })
  priceDate: Date;
  @Column({ type: 'decimal', precision: 8, scale: 2 })
  productPrice: number;
}
