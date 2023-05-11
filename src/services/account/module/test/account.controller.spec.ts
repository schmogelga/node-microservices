import { expect, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../../../../entity/account.entity';
import { beforeEach, describe, it } from 'node:test';
import { AccountController } from '../account.controller';
import { AccountRepository } from '../account.repository';
import { AccountService } from '../account.service';
import { NotFoundError, ConflictError } from '../../../../util/error/BusinessErrors';

describe( 'AccountController', () => {
    let accountController: AccountController;
    let accountService: AccountService;

    let accountRepositoryMock = {
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
    }

    const account: Account = {
        id: 0,
        username: 'username',
        email: 'email',
        password: ''
    };

    beforeEach( async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [ AccountRepository ],
            controllers: [ AccountController ],
            providers: [
                AccountService,
                {
                    provide: getRepositoryToken(Account),
                    useValue: accountRepositoryMock,
                },                
            ],
        }).compile();
    
        accountController = app.get<AccountController>( AccountController );
        accountService = app.get<AccountService>( AccountService );
    });

    it('AccountController - should be defined', () => {
        expect(accountController).toBeDefined();
    });


    describe('getAllAccounts', () => {

        it('should return an Account array', async () => {
            
            accountRepositoryMock.find.mockReturnValue( [ account ] )

            const result = await accountController.getAllAccounts(); 

            expect( accountRepositoryMock.find ).toHaveBeenCalled();
            expect( result ).toEqual( [ account ] );
        })
    })

    describe( 'getAccount', () => {

        it( 'should return an account with the given id', async () => {

            accountRepositoryMock.findOne.mockReturnValue( account );

            const result = await accountController.getAccount( 0 );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { id: 0 } } );
            expect( result ).toEqual( account );
        });

        it( 'shoul throw NotFoundError', async () => {

            accountRepositoryMock.findOne.mockReturnValue( !account );

            try {
                await accountController.getAccount( 0 );
            } catch ( error ) {

                expect( error ).toBeInstanceOf( NotFoundError );
            }
        })
    });

    describe( 'createAccount', () => {

        it( 'should create an account', async () => {

            accountRepositoryMock.findOne.mockReturnValue( null )
            accountRepositoryMock.save.mockReturnValue( account );
        
            const result = await accountController.createAccount( account );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { username: account.username } } );
            expect( result ).toEqual( account ); 
        });
    
        it( 'should throw ConflictError', async () => {

            accountRepositoryMock.findOne.mockReturnValue( account )

            try {
                
                await accountController.createAccount( account );
            } catch ( error ) {
                
                expect( error ).toBeInstanceOf( ConflictError );
            }
        });
    });

});