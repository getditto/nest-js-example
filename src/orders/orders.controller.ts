import { Ditto } from "@dittolive/ditto";
import { Controller, Get, Post } from "@nestjs/common";
import { DittoService } from "src/ditto/ditto.service";
import { Order } from "./order";

@Controller('orders')
export class OrdersController {

    private ditto: Ditto

    constructor(dittoService: DittoService) {
        this.ditto = dittoService.ditto
    }

    @Get()
    async findAll(): Promise<Order[]> {
        const documents = await this.ditto.store.collection('orders').findAll().exec()
        return documents.map((d) => Order.fromDittoDocument(d));
    }
}