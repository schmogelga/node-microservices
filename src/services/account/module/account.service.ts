import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "../../../entity/account.entity";
import { AccountRepository } from "./account.repository";

@Injectable()
export class AccountService {

    constructor( @InjectRepository(Account) private accountRepositorry: AccountRepository ){}

    createAccount( username: string, email: string ){

        const account = new Account();

        account.email = email;
        account.username = username;

        this.accountRepositorry.save( account );
    }
}

