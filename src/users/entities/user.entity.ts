import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
