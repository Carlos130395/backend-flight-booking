import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { FlightsModule } from 'src/flights/flights.module';
import { ClientsModule } from 'src/clients/clients.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [FlightsModule, ClientsModule, PaymentsModule],
  providers: [InitService],
})
export class InitModule {}
