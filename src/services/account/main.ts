import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'


console.log(process.env.PG_USERNAME);


async function bootstrap() {
    const app = NestFactory.create( AppModule );
    (await app).listen(3000);
}

bootstrap();