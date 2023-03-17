import { Module } from '@nestjs/common';
import { DittoModule } from 'src/ditto/ditto.module';
import { DittoService } from 'src/ditto/ditto.service';
import { OrdersController } from './orders.controller';

@Module({
    controllers: [OrdersController],
    imports: [DittoModule]
})
export class OrdersModule {}