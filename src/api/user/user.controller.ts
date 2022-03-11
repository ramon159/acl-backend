import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  /* #region swagger */
  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({ status: 201, description: 'a user has been added' })
  @ApiResponse({ status: 400, description: 'Invalid Parameters' })
  /* #endregion */
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAsync(createUserDto);
  }

  @Get()
  /* #region  swagger */
  @ApiOperation({ summary: 'Returns a user paged list' })
  @ApiResponse({
    status: 200,
    description: 'users returned successfully',
  })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'page', type: Number })
  /* #endregion */
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginateAsync({
      page,
      limit,
      route: '/users',
    });
  }

  @Get(':id')
  /* #region  swagger */
  @ApiOperation({ summary: 'Return a user' })
  @ApiResponse({ status: 201, description: 'A user returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  /* #endregion */
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findByIdAsync(id);
  }

  @Patch(':id')
  /* #region  swagger */
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'A user has been updated',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  /* #endregion */
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateAsync(id, updateUserDto);
  }

  @Delete(':id')
  /* #region  swagger */
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'A user was deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  /* #endregion */
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.removeAsync(id);
  }
}
