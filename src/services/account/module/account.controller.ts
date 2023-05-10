import { Body, Controller, Inject, Post, Get, Delete, Put, Param } from "@nestjs/common";
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
    getAllAccounts(){
        this.accountService.getAllAccounts();
    }

    @Get( ':id' )
    getAccount( @Param( 'id' ) accountId: number ){
        this.accountService.geAccount( accountId );
    }

    @Delete( ':id' )
    async deleteAccount( @Param( 'id' ) accountId: number ): Promise<void>{
        
        return this.accountService.deleteAccount( accountId );
    }

    @Put( ':id' )
    async updateAccount( @Param( 'id' ) accountId: number, @Body() account: Account ): Promise<Account>{
        return this.accountService.updateAccount( accountId, account );
    }

}