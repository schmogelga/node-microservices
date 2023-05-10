import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId, Repository } from "typeorm";
import { Account } from "../../../entity/account.entity";
import { AccountRepository } from "./account.repository";

@Injectable()
export class AccountService {
    
    constructor( @InjectRepository(Account) private accountRepositorry: AccountRepository ){}
    
    async updateAccount( id: number, account: Account ): Promise<Account> {
        await this.accountRepositorry.update( id, account );
        return await this.geAccount( id );
    }
    
    async deleteAccount( id: number ): Promise<void> {
        
        await this.geAccount( id );
        await this.accountRepositorry.delete( id );
    }

    async geAccount( id: number ): Promise<Account> {
    
        const account = await this.accountRepositorry.findOne( { where: { id } } );
        if( !account ){
            throw new Error( "User not found" );
        }
        
        return account;
    }
    async getAllAccounts(): Promise<Account[]> {
        return await this.accountRepositorry.find();
    }

    async createAccount( username: string, email: string ): Promise<Account>{

        let account = new Account();

        account.email = email;
        account.username = username;

        account = this.accountRepositorry.create( account )
        return await this.accountRepositorry.save( account );
    }
}

