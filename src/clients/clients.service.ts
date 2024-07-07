import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async createClient(name: string, email: string): Promise<Client> {
    const client = this.clientsRepository.create({ name, email });
    return await this.clientsRepository.save(client);
  }

  async getClient(clientId: number): Promise<Client> {
    return await this.clientsRepository.findOneBy({ id: clientId });
  }
}
