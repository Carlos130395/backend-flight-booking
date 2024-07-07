import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  async createClient(@Body() createClientDto: { name: string; email: string }) {
    return this.clientsService.createClient(
      createClientDto.name,
      createClientDto.email,
    );
  }

  @Get(':id')
  async getClient(@Param('id') id: number) {
    return this.clientsService.getClient(id);
  }
}
