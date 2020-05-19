import * as cardService from '../../src/services/cards-service';
import * as cardDao from '../../src/daos/cards-dao';


jest.mock('../../src/daos/cards-dao');

const mockCardDao = cardDao as any;

describe('patchCard', () => {
    /* Testing behavior of patchPerson */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockCardDao.patchCard
            .mockImplementation(() => ({}));

        const payload = {
        id: '1',
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546'
        };

        const result = await cardService.patchCard(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockCardDao.patchCard
            .mockImplementation(() => ({}));

        const payload = {
        id: undefined,
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546'
        };

        try {
            await cardService.patchCard(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});



describe('addCard', () => {
    test('422 returned if no credit card type provided', async () => {
        
        expect.assertions(1);
        
        mockCardDao.addCard.mockImplementation(() => ({}));

        const payload = {
        id: undefined,
        //ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546'
        }

        try {
            // This async function should reject due to missing ccType
            await cardService.addCard(payload);
            fail('cardService.addCard did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
     
    });
    

});



describe('getCardOwner', () => {
    test('Just testing to see if this works', async () => {
        
        expect.assertions(1);
        
        mockCardDao.getCardOwner.mockImplementation(() => ({}));

        const result = await cardService.getCardOwner();
        expect(result).toBeTruthy();
     
    });

});