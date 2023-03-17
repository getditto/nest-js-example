import { Document, Register } from "@dittolive/ditto"
import moment, { Moment } from "moment"

export class Order {
    _id: string
    createdOn: Moment
    productIds: string[]
    name: string

    static fromDittoDocument(dittoDocument: Document) {
        const order = new Order()
        order._id = dittoDocument.id.value
        order.productIds = dittoDocument.at("productIds").register.value
        order.createdOn = moment(dittoDocument.at('createdOn').register.value)
        return order
    }

    toDocumentPayload(): {[key: string]: any} {
        return {
            '_id': this._id,
            'createdOn': this.createdOn.toISOString(),
            'productIds': new Register(this.productIds),
            'name': this.name
        }
    }
}