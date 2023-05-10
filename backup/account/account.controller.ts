import { Controller, Post,  Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request, Response } from 'express';


@Controller('accounts')
export class AccountController {
    constructor( private accountService: AccountService ) {}

    @Post()
    async createAccount(@Body() body: { username: string, email: string }) {
        return this.accountService.crerateAccount( body.username, body.email );
    }

}

