import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAsync(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async findAllAsync() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByIdAsync(id: User['id']) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async updateAsync(id: User['id'], updateUserDto: UpdateUserDto) {
    const user = await this.findByIdAsync(id);

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }

  async removeAsync(id: User['id']) {
    await this.findByIdAsync(id);
    await this.usersRepository.softDelete(id);
  }
}
