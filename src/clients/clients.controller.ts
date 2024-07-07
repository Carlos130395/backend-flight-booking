import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  async createClient(@Body('name') name: string, @Body('email') email: string) {
    return await this.clientsService.createClient(name, email);
  }

  @Get(':id')
  async getClient(@Param('id') id: number) {
    return await this.clientsService.getClient(id);
  }
}
