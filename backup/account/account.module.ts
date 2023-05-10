import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AccountRepository } from "./account.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { typeOrmConfig } from "../../config/DatabaseConfig";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Account, AccountRepository]),
        TypeOrmModule.forRoot(typeOrmConfig)
    ],
    controllers: [AccountController],
    providers: [AccountService],
})

export class AccountModule {}