import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
