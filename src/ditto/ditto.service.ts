import { Ditto, Subscription } from "@dittolive/ditto";
import { Injectable, Scope } from "@nestjs/common";
import { Product } from "src/products/product";
import { faker } from '@faker-js/faker';
import _ from "lodash";
import { Order } from "src/orders/order";
import moment from "moment";


@Injectable()
export class DittoService {

    public ditto: Ditto

    public productsSubscription: Subscription
    public ordersSubscription: Subscription

    constructor() {
        console.log(`onApplicationBootstrap`)
        this.ditto = new Ditto({
            type: 'onlinePlayground',
            appID: process.env.DITTO_APP_ID,
            token: process.env.DITTO_ONLINE_PLAYGROUND_TOKEN
        })
        console.log(`About to start Ditto`)
        this.ditto.startSync()
        console.log(`Ditto is started!`)
        this.seedSomeFakeData()

        this.ordersSubscription = this.ditto.store.collection('orders').findAll().subscribe()
        this.productsSubscription = this.ditto.store.collection('products').findAll().subscribe()
    }

    beforeApplicationShutDown() {
        this.ordersSubscription?.cancel()
        this.productsSubscription?.cancel()
        this.ditto.stopSync()
    }

    private async seedSomeFakeData() {
        // let's create 20 products
        _.range(0, 20).forEach(async (i) => {
            const product = new Product();
            product._id = `sample-product-${i}`;
            product.price = _.random(10, 100);
            product.name = faker.commerce.product()
            await this.ditto.store.collection('products').upsert(product.toDocumentPayload());
        })

        let productIds: string[] = await (async () => {
            const products = await this.ditto.store.collection('products').findAll().exec()
            return products.map(p => p.id.value)
        })()
        
        // let's create 100 orders
        _.range(0, 20).forEach(async (i) => {
            const order = new Order();
            order._id = `sample-order-${i}`;
            order.productIds = _.sampleSize(productIds, _.random(0, 4))
            order.createdOn = moment()
            await this.ditto.store.collection('orders').upsert(order.toDocumentPayload());
        })
        
    }
}