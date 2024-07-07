import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight } from './entities/flight.entity';
import { EventBusService } from '../event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { PaymentProcessedEvent } from '../payments/events/payment-processed.event';
import { PaymentFailedEvent } from '../payments/events/payment-failed.event';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightsService, EventBusService],
  controllers: [FlightsController],
  exports: [TypeOrmModule],
})
export class FlightsModule implements OnModuleInit {
  private subscription: Subscription;

  constructor(
    private readonly flightsService: FlightsService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit() {
    this.subscription = this.eventBus.events$.subscribe((event) => {
      if (event instanceof PaymentProcessedEvent) {
        this.handlePaymentProcessed(event);
      } else if (event instanceof PaymentFailedEvent) {
        this.handlePaymentFailed(event);
      }
    });
  }

  onModuleDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private async handlePaymentProcessed(event: PaymentProcessedEvent) {
    await this.flightsService.bookFlight(event.paymentId);
  }

  private async handlePaymentFailed(event: PaymentFailedEvent) {
    await this.flightsService.cancelBooking(event.paymentId);
  }
}
