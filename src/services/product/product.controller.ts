import { Body, Controller, Inject, Post, Get, Delete, Put, Param, UseInterceptors } from "@nestjs/common";
import { BusinessInterceptor } from "../../util/error/BusinessInterceptor";
import { Product } from "../../entity/product.entity";
import { ProductService } from "./product.service";

@Controller( 'products' )
@UseInterceptors( BusinessInterceptor )
export class ProductController {

    constructor( @Inject( ProductService ) private productService: ProductService ){}

    @Post()
    async createProduct( @Body() body: { name: string } ){
            
        return await this.productService.createProduct( body.name );
    }

    @Get()
    async getAllProducts() {

        return await this.productService.getAllProducts();
    }

    @Get( ':id' )
    async getProduct( @Param( 'id' ) productId: number ){

        return await this.productService.geProduct( productId );
    }

    @Delete( ':id' )
    async deleteProduct( @Param( 'id' ) productId: number ){
        
        await this.productService.deleteProduct( productId );
    }

    @Put( ':id' )
    async updateProduct( @Param( 'id' ) productId: number, @Body() product: Product ){

        return await this.productService.updateProduct( productId, product );
    }
}