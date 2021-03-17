import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @PrimaryColumn({ unique: true })
  storeId: number;
  @Column({ type: 'character varying', length: 50, unique: true })
  storeName: string;
}
