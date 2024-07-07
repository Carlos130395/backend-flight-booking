import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  async processPayment(
    @Body('paymentId') paymentId: number,
    @Body('amount') amount: number,
  ) {
    await this.paymentsService.processPayment(paymentId, amount);
    return { message: 'Payment processed successfully' }; // Asegúrate de retornar una respuesta
  }

  @Post('fail')
  async failPayment(
    @Body('paymentId') paymentId: number,
    @Body('reason') reason: string,
  ) {
    await this.paymentsService.failPayment(paymentId, reason);
    return { message: 'Payment failed' }; // Asegúrate de retornar una respuesta
  }
}
