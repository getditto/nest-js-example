import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Nest App is running on port ${PORT}.`)
}
bootstrap();
