import { NestFactory } from "@nestjs/core";
import { AccountModule } from "./account.module";

const port = 3000;

async function bootstrap() {
    const app = await NestFactory.create(AccountModule);
    await app.listen(port);
}

bootstrap();