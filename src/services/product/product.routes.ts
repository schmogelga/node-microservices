import { Router } from 'express'
import { createProductHandler, getAllProductsHandler } from './product.controller'


const productRouter = Router()

productRouter.route( '/' )
    .post(createProductHandler)
    .get(getAllProductsHandler);

export default productRouter;