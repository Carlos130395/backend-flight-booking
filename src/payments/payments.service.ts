import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { EventBusService } from '../event-bus/event-bus.service';
import { PaymentProcessedEvent } from './events/payment-processed.event';
import { PaymentFailedEvent } from './events/payment-failed.event';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private eventBus: EventBusService,
  ) {}

  async processPayment(paymentId: number, amount: number): Promise<void> {
    const payment = new Payment();
    payment.id = paymentId;
    payment.amount = amount;
    payment.status = 'processed';

    await this.paymentsRepository.save(payment);
    this.eventBus.publish(new PaymentProcessedEvent(paymentId));
  }

  async failPayment(paymentId: number, reason: string): Promise<void> {
    const payment = new Payment();
    payment.id = paymentId;
    payment.status = 'failed';

    await this.paymentsRepository.save(payment);
    this.eventBus.publish(new PaymentFailedEvent(paymentId, reason));
  }
}
