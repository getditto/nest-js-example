import { Document, Register } from "@dittolive/ditto"

export class Product {
    _id: string
    name: string
    price: number

    static fromDittoDocument(dittoDocument: Document): Product {
        const product = new Product()
        product._id = dittoDocument.id.value
        product.name = dittoDocument.at('name').register.value
        product.price = dittoDocument.at('price').register.value
        return product
    }

    toDocumentPayload(): {[key: string]: any} {
        return {
            '_id': this._id,
            'name': new Register(this.name),
            'price': new Register(this.price),
        }
    }
}