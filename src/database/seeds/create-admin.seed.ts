import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { Role } from 'src/common/entities/role.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(
        new Role({ name: 'admin', description: 'administrator of system' }),
      )
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(new User({ username: 'admin', password: 'root' }))
      .execute();
  }
}
