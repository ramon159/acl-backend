import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('permissions')
export class Permission extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  constructor(partial: Partial<Permission>) {
    super();
    Object.assign(this, partial);
  }
}
