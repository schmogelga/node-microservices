import { Body, Controller, Inject, Post, Get, Delete, Put, Param, UseInterceptors } from "@nestjs/common";
import { BusinessInterceptor } from "../../../util/error/BusinessInterceptor";
import { Account } from "../../../entity/account.entity";
import { AccountService } from "./account.service";

@Controller( 'accounts' )
@UseInterceptors( BusinessInterceptor )
export class AccountController {

    constructor( @Inject( AccountService ) private accountService: AccountService ){}

    @Post()
    async createAccount( @Body() body: { username: string, email: string } ){
            
        return await this.accountService.createAccount( body.username, body.email );
    }

    @Get()
    async getAllAccounts() {

        return await this.accountService.getAllAccounts();
    }

    @Get( ':id' )
    async getAccount( @Param( 'id' ) accountId: number ){

        return await this.accountService.geAccount( accountId );
    }

    @Delete( ':id' )
    async deleteAccount( @Param( 'id' ) accountId: number ){
        
        await this.accountService.deleteAccount( accountId );
    }

    @Put( ':id' )
    async updateAccount( @Param( 'id' ) accountId: number, @Body() account: Account ){

        return await this.accountService.updateAccount( accountId, account );
    }

}