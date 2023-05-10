import { Controller, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController{
    
    constructor( @Inject(AppService) appService: AppService ){}

}