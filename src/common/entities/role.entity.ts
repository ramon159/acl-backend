import { Permission } from 'src/common/entities/permission.entity';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
