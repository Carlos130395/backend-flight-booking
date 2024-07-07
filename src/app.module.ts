import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { FlightsModule } from './flights/flights.module';
import { ClientsModule } from './clients/clients.module';
import { EventBusModule } from './event-bus/event-bus.module';
import { InitModule } from './init/init.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flight_booking',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PaymentsModule,
    FlightsModule,
    ClientsModule,
    EventBusModule,
    InitModule,
  ],
})
export class AppModule {}
