import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from "../../../util/error/NotFoundError";
import { Account } from "../../../entity/account.entity";
import { AccountRepository } from "./account.repository";

@Injectable()
export class AccountService {
    
    constructor( @InjectRepository(Account) private accountRepository: AccountRepository ){}
    
    async updateAccount( id: number, account: Account ): Promise<Account> {
        await this.accountRepository.update( id, account );
        return await this.geAccount( id );
    }
    
    async deleteAccount( id: number ): Promise<void> {
        
        await this.geAccount( id );
        await this.accountRepository.delete( id );
    }

    async geAccount( id: number ): Promise<Account> {
    
        const account = await this.accountRepository.findOne( { where: { id } } );
        if( !account ){
            throw new NotFoundError( "Account not found" );
        }
        
        return account;
    }

    async getAllAccounts(): Promise<Account[]> {
        return await this.accountRepository.find();
    }

    async createAccount( username: string, email: string ): Promise<Account>{

        let account = new Account();

        account.email = email;
        account.username = username;

        account = this.accountRepository.create( account )
        return await this.accountRepository.save( account );
    }
}

