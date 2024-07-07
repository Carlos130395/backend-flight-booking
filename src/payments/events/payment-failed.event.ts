export class PaymentFailedEvent {
  constructor(
    public readonly paymentId: number,
    public readonly reason: string,
  ) {}
}
