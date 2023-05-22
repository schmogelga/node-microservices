import { expect, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../../../../entity/account.entity';
import { AccountController } from '../account.controller';
import { AccountRepository } from '../account.repository';
import { AccountService } from '../account.service';
import { NotFoundError, ConflictError } from '../../../../util/error/BusinessErrors';

describe( 'AccountController', () => {
    let accountController: AccountController;

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
    });

    it('AccountController - should be defined', () => {
        expect(accountController).toBeDefined();
    });


    describe('getAllAccounts', () => {

        it('should return an Account array', async () => {
            
            accountRepositoryMock.find.mockReturnValueOnce( [ account ] )

            const result = await accountController.getAllAccounts(); 

            expect( accountRepositoryMock.find ).toHaveBeenCalled();
            expect( result ).toEqual( [ account ] );
        })
    })

    describe( 'getAccount', () => {

        it( 'should return the Account with the given id', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( account );

            const result = await accountController.getAccount( account.id );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { id: account.id } } );
            expect( result ).toEqual( account );
        });

        it( 'shoul throw NotFoundError', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( !account );

            try {
                await accountController.getAccount( account.id );
            } catch ( error ) {

                expect( error ).toBeInstanceOf( NotFoundError );
            }
        })
    });

    describe( 'createAccount', () => {

        it( 'should create an Account', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( null )
            accountRepositoryMock.create.mockReturnValueOnce( account );
            accountRepositoryMock.save.mockReturnValueOnce( account );
        
            const result = await accountController.createAccount( account );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { username: account.username } } );
            expect( accountRepositoryMock.create ).toHaveBeenCalledWith( account );
            expect( accountRepositoryMock.save ).toHaveBeenCalledWith( account );
            expect( result ).toEqual( account ); 
        });
    
        it( 'should throw ConflictError', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( account )

            try {
                
                await accountController.createAccount( account );
            } catch ( error ) {
                
                expect( error ).toBeInstanceOf( ConflictError );
            }
        });
    });

    describe( 'deleteAccount', () => {

        it( 'should delete the Account with the given id', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( account );

            await accountController.deleteAccount( account.id );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { id: account.id } } );
            expect( accountRepositoryMock.delete ).toHaveBeenCalledWith( account.id );            
        });

        it( 'should throw NotFoundError', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( null );

            try {
                await accountController.deleteAccount( account.id );
                
            } catch (error) {
                
                expect( error ).toBeInstanceOf( NotFoundError );
            }
        });
    });

    describe( 'updateAccount', () => {

        it( 'should update the Account with the given id', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( null );
            accountRepositoryMock.findOne.mockReturnValueOnce( account );
            accountRepositoryMock.update.mockReturnValueOnce( account );

            const result = await accountController.updateAccount( account.id, account );

            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { username: account.username } } );
            expect( accountRepositoryMock.update ).toHaveBeenCalledWith( account.id, account ); 
            expect( accountRepositoryMock.findOne ).toHaveBeenCalledWith( { where: { id: account.id } } );

            expect( result ).toEqual( account );
        });
        
        it( 'should throw ConflictError', async () => {
           
            accountRepositoryMock.findOne.mockReturnValueOnce( null );
            accountRepositoryMock.update.mockReturnValueOnce( account );    
            accountRepositoryMock.findOne.mockReturnValueOnce( null );

            try {
                
                await accountController.updateAccount( account.id, account );
            } catch (error) {
                
                expect( error ).toBeInstanceOf( NotFoundError );
            }
        });

        it( 'should throw NotFoundError', async () => {

            accountRepositoryMock.findOne.mockReturnValueOnce( account );
            
            try {

                await accountController.updateAccount( account.id, account );
            } catch ( error ) {
                
                expect( error ).toBeInstanceOf( ConflictError );
            }
        });
    });

});