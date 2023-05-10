import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRepository } from "./account.repository";
import { Account } from "./account.entity";


@Injectable()
export class AccountService {
    constructor( @InjectRepository(AccountRepository) private accountRepository: AccountRepository ) {}

    crerateAccount( username: string, email: string ){

        const account = new Account();
        account.username = username
        account.email = username

        this.accountRepository.save(account);
    }
}