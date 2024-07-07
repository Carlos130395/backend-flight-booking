import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../flights/entities/flight.entity';
import { Client } from '../clients/entities/client.entity';
import { Payment } from '../payments/entities/payment.entity';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async onModuleInit() {
    await this.initializeFlights();
    await this.initializeClients();
    await this.initializePayments();
  }

  private async initializeFlights() {
    const flights = [
      { destination: 'New York', departureDate: new Date('2023-12-25'), availableSeats: 100 },
      { destination: 'London', departureDate: new Date('2023-11-15'), availableSeats: 80 },
    ];
    await this.flightsRepository.save(flights);
  }

  private async initializeClients() {
    const clients = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    await this.clientsRepository.save(clients);
  }

  private async initializePayments() {
    const payments = [
      { amount: 100, status: 'processed' },
      { amount: 200, status: 'failed' },
    ];
    await this.paymentsRepository.save(payments);
  }
}
