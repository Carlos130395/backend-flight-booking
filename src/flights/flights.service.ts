import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { EventBusService } from '../event-bus/event-bus.service';
import { FlightBookedEvent } from './events/flight-booked.event';
import { FlightBookingFailedEvent } from './events/flight-booking-failed.event';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    private eventBus: EventBusService,
  ) {}

  async bookFlight(flightId: number): Promise<void> {
    const flight = await this.flightsRepository.findOneBy({ id: flightId });
    if (flight && flight.availableSeats > 0) {
      flight.availableSeats--;
      await this.flightsRepository.save(flight);
      this.eventBus.publish(new FlightBookedEvent(flightId));
    } else {
      this.eventBus.publish(new FlightBookingFailedEvent(flightId, 'No available seats'));
    }
  }

  async cancelBooking(flightId: number): Promise<void> {
    const flight = await this.flightsRepository.findOneBy({ id: flightId });
    if (flight) {
      flight.availableSeats++;
      await this.flightsRepository.save(flight);
    }
  }
}
