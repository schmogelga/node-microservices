import { Repository } from "typeorm";
import { Account } from "../../../entity/account.entity";

export class AccountRepository extends Repository<Account> {}