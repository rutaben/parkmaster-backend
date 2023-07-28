import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { VehicleType } from '../common/enums/vehicle-type.enum';
import { Weekday } from '../common/enums/weekday.enum';

@Entity()
export class FeeSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleType: VehicleType;

  @Column()
  weekday: Weekday;

  @Column()
  feeRate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
