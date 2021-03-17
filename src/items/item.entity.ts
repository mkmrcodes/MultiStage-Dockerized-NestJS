import { StoreDetails } from 'src/storedetails/storedetails.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryColumn({ type: 'character varying', length: 20, unique: true })
  productBarcode: string;
  @Column({ type: 'character varying', length: 50 })
  productMainTitle: string;
  @Column({ type: 'character varying', length: 80 })
  productKind: string;
  @Column({ type: 'character varying', length: 100 })
  productSubKind: string;
  @Column({ type: 'character varying', length: 50 })
  brandName: string;
  @Column({ type: 'character varying', length: 100 })
  brandSubName: string;
  @Column({ type: 'character varying', length: 100 })
  productImg: string;
  @OneToMany(
    () => StoreDetails,
    (storeDetails: StoreDetails) => storeDetails.item,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  storeDetails: StoreDetails[];
}
