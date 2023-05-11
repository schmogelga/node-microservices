import { Body, Controller, Inject, Post, Get, Delete, Put, Param, UseInterceptors } from "@nestjs/common";
import { BusinessInterceptor } from "../../../util/error/BusinessInterceptor";
import { Account } from "../../../entity/account.entity";
import { AccountService } from "./account.service";

@Controller( 'accounts' )
export class AccountController {

    constructor( @Inject( AccountService ) private accountService: AccountService ){}

    @Post()
    createAccount( @Body() body: { username: string, email: string } ){
            
        this.accountService.createAccount( body.username, body.email );
    }

    @Get()
    getAllAccounts() {

        this.accountService.getAllAccounts();
    }

    @Get( ':id' )
    @UseInterceptors( BusinessInterceptor )
    async getAccount( @Param( 'id' ) accountId: number ){

        return await this.accountService.geAccount( accountId );
    }

    @Delete( ':id' )
    deleteAccount( @Param( 'id' ) accountId: number ){
        
        return this.accountService.deleteAccount( accountId );
    }

    @Put( ':id' )
    updateAccount( @Param( 'id' ) accountId: number, @Body() account: Account ){

        return this.accountService.updateAccount( accountId, account );
    }

}