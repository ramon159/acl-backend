import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Adiciona um novo usuário' })
  @ApiResponse({ status: 201, description: 'Novo usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createAsync(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista de usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  async findAll() {
    return await this.usersService.findAllAsync();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um usuário' })
  @ApiResponse({ status: 201, description: 'Um usuário retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findByIdAsync(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Um usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateAsync(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.removeAsync(id);
  }
}
