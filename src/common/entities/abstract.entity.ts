import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export abstract class AbstractEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: Date;

  @VersionColumn()
  version: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
