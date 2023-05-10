import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AccountService } from "./account.service";

@Controller('accounts')
export class AccountController {

    constructor( @Inject( AccountService ) private accountService: AccountService ){}

    @Post()
    createAccount( @Body() body: { username: string, email: string } ){
        this.accountService.createAccount( body.username, body.email );
    }
}