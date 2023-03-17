<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

1. Install dependences

```bash
$ npm install
```

2. _Important!_

Create a file called `.env` in the root and replace it with your online playground credentials 

```
DITTO_APP_ID=REPLACE_ME
DITTO_ONLINE_PLAYGROUND_TOKEN=REPLACE_ME
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open the routes to see the sample Ditto data

```
http://localhost:3000/products
http://localhost:3000/orders
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Best Practice for Setting Up Ditto

1. Create a directory `src/ditto`
2. Inside the directory create two files `ditto.module.ts` and `ditto.service.ts`
3. Inside `ditto.service.ts` create the following:

```ts
@Injectable()
export class DittoService {

    public ditto: Ditto

    onApplicationBootstrap() {
        this.ditto = new Ditto({
            // your configuration information
            // see docs.ditto.live for more information
        })
        this.ditto.startSync()
    }
    
    beforeApplicationShutDown() {
        this.ditto.stopSync()
    }
}
```

4. In `ditto.module.ts` add the following code:

```ts
@Module({ 
    providers: [DittoService],
    exports: [DittoService]
})
export class DittoModule { }
```

It's extremely important to export the `DittoService` as well as stating that it should be a provider.

5. Next in `app.module.ts` import the `DittoModule`:

```ts
@Module({
  imports: [DittoModule, OrdersModule, ProductsModule], // import it here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

6. In your other modules for example in `src/orders/order.module.ts` or in `src/products/products.module.ts` import `DittoModule` like so:

```ts
@Module({
    controllers: [OrdersController],
    imports: [DittoModule] // import `DittoModule`
})
export class OrdersModule {}
```

7. In your other controllers or services, you'll be able to inject the `DittoService` easily like so:

```ts
@Controller('orders')
export class OrdersController {

    private ditto: Ditto

    constructor(dittoService: DittoService) {
        this.ditto = dittoService.ditto
    }

```

Remember `@Injectable()` in NestJS is by default a Singleton per each module. Ditto uses local resources like a persistence directory (which is `"./ditto"` by default). Multiple instances or processes cannot access the `"./ditto"` directory at the the same time; thus we have to make sure that _only one_ instance of `DittoModule` ever exists.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
