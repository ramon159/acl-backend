import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Role } from 'src/common/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Permission } from 'src/common/entities/permission.entity';

@Entity('users')
export class User extends AbstractEntity {
  // @Column()
  // fullname: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Exclude()
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
