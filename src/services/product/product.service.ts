import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError, ConflictError } from "../../util/error/BusinessErrors";
import { Product } from "../../entity/product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
    
    constructor( @InjectRepository(Product) private productRepository: ProductRepository ){}
    
    async updateProduct( id: number, product: Product ): Promise<Product> {
        
        await this.productRepository.update( id, product );
        return await this.geProduct( id );
    }
    
    async deleteProduct( id: number ): Promise<void> {
        
        await this.geProduct( id );
        await this.productRepository.delete( id );
    }

    async geProduct( id: number ): Promise<Product> {
    
        const product = await this.productRepository.findOne( { where: { id } } );
        if( !product ){
            throw new NotFoundError( "Product not found" );
        }
        
        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async createProduct( name: string ): Promise<Product>{

        let product = new Product();

        product.name = name;

        product = this.productRepository.create( product );
        return await this.productRepository.save( product );
    }
}

