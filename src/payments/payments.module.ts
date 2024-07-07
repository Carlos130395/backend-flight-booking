import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { EventBusModule } from '../event-bus/event-bus.module';  // Importa EventBusModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    EventBusModule,  // Asegúrate de importar EventBusModule aquí
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [TypeOrmModule],
})
export class PaymentsModule {}
