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

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column()
  vehicleType: VehicleType;

  @Column()
  arrival: Date;

  @Column({ nullable: true })
  departure: Date;

  @Column({ nullable: true })
  timeTotal: number;

  @Column({ nullable: true })
  feeTotal: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
