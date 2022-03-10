import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async createAsync(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    await this.repo.save(user);
    return user;
  }

  async paginateAsync(options: IPaginationOptions): Promise<Pagination<User>> {
    return await paginate<User>(this.repo, options);
  }

  async findByIdAsync(id: User['id']) {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async updateAsync(id: User['id'], updateUserDto: UpdateUserDto) {
    const user = await this.findByIdAsync(id);

    const updatedUser = this.repo.merge(user, updateUserDto);
    await this.repo.save(updatedUser);
    return updatedUser;
  }

  async removeAsync(id: User['id']) {
    await this.findByIdAsync(id);
    await this.repo.softDelete(id);
  }
}
