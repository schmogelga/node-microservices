import{ EntityRepository, Repository } from "typeorm";
import { Account } from "./account.entity";


export class AccountRepository extends Repository<Account> {}