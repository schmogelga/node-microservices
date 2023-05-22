import { AppDataSource } from "../../config/database";
import express from 'express';
import productRouter from "./product.routes";


const port = 3000;

AppDataSource.initialize()
    .then( async () => {

        const app = express();

        app.use( express.json());

        app.use( '/products', productRouter);
        app.listen( port );

        console.log( `Server start on ${port}` );
    })
    .catch( (error) => {
        console.log( error );
    });