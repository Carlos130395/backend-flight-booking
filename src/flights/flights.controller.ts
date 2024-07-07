import { Controller, Post, Body } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('book')
  async bookFlight(@Body('flightId') flightId: number) {
    await this.flightsService.bookFlight(flightId);
    return { message: 'Flight booked successfully' }; // Asegúrate de retornar una respuesta
  }

  @Post('cancel')
  async cancelBooking(@Body('flightId') flightId: number) {
    await this.flightsService.cancelBooking(flightId);
    return { message: 'Flight booking cancelled successfully' }; // Asegúrate de retornar una respuesta
  }
}
