export class FlightBookingFailedEvent {
  constructor(
    public readonly flightId: number,
    public readonly reason: string,
  ) {}
}
