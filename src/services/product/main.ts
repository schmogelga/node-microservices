import { NestFactory } from '@nestjs/core'
import { ProductModule } from './product.module'


console.log(process.env.PG_USERNAME);


async function bootstrap() {
    const app = NestFactory.create( ProductModule );
    (await app).listen(3001);
}

bootstrap();