import { AppDataSource, config } from "../../config/database";
import { Repository } from "typeorm";
import { Product } from "../../entity/product.entity";


const productRepostory: Repository<Product> = AppDataSource.getRepository( Product );

export const getAllProducts = async (): Promise<Product[]> => {

    return await productRepostory.find();
}

export const createProduct = async ( name: string ): Promise<Product> => {

    let product = new Product();

    product.name = name;
    
    product = productRepostory.create( product );
    return await productRepostory.save( product );
} 
