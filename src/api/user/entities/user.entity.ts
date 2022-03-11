import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Role } from 'src/api/role/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from 'src/api/permission/entities/permission.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'users_permissions',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions: Permission[];
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
