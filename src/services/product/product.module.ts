import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "../../entity/product.entity";
import { ProductService } from "./product.service";
import { ConfigModule } from "@nestjs/config";
import { config } from "../../config/database";

@Module({
    imports: [
        TypeOrmModule.forRoot( config ),
        TypeOrmModule.forFeature([Product]),
        ConfigModule.forRoot()
],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule{}