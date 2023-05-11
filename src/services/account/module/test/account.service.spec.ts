import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it } from "node:test";
import { AccountController } from "../account.controller";
import { AccountService } from "../account.service";
import { expect, jest } from "@jest/globals"
import { Account } from "../../../../entity/account.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('accountService', () => {
    let accountService: AccountService;

    beforeEach( async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [
                AccountService,
                {
                    provide: getRepositoryToken(Account),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        accountService = app.get<AccountService>(AccountService);
    })

    it('AccountService - should be defined', () => {
        expect(accountService).toBeDefined();
    });

});