import { Request, Response } from "express";
import { createProduct, getAllProducts } from "./product.service";


export const getAllProductsHandler = async ( req: Request, res: Response ) => {

    try {
        
        const result = await getAllProducts();
        res.status( 200 ).json({
            status: 'success',
            data: result 
        });
    
    } catch ( error ) {
        console.log( error );

        res.status( 500 ).json({
            status: 'internal server error' 
        });
    }
}

export const createProductHandler = async ( req: Request, res: Response ) => {

    try {
        const result = await createProduct( req.body.name );
        res.status( 201 ).json({
            status: 'created',
            data: result
        });

    } catch (error) {
        console.log( error );

        res.status( 500 ).json({
            status: 'internal server error' 
        });
    }


}