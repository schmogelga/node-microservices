import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../../config/database";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountModule } from "./modules/account.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot( config ),
        AccountModule
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export class AppModule{}