import { Ditto } from "@dittolive/ditto";
import { Controller, Get } from "@nestjs/common";
import { DittoService } from "src/ditto/ditto.service";
import { Product } from "./product";

@Controller('products')
export class ProductsController {

    private ditto: Ditto

    constructor(dittoService: DittoService) {
        this.ditto = dittoService.ditto
    }

    @Get()
    async findAll(): Promise<Product[]> {
        const documents = await this.ditto.store.collection('products').findAll().exec()
        return documents.map((d) => Product.fromDittoDocument(d));
    }
}