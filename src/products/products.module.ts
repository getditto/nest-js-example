import { Module } from "@nestjs/common";
import { DittoModule } from "src/ditto/ditto.module";
import { DittoService } from "src/ditto/ditto.service";
import { ProductsController } from "./products.controller";

@Module({
    controllers: [ProductsController],
    imports: [DittoModule]
})
export class ProductsModule {}