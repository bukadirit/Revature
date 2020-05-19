import * as custService from '../../src/services/customer-services';
import * as custDao from '../../src/daos/customer-dao';


jest.mock('../../src/daos/customer-dao');

const mockcustDao = custDao as any;

describe('patchCustomer', () => {

    test('successful patch', async () => {
        expect.assertions(1);

        mockcustDao.patchCustomer
            .mockImplementation(() => ({}));

        const payload = {
            id: "2",
            firstName: 'Reshi',
	        lastName: '',
        	address: 'Pokemon Black',
        	city: '',
	        state: 'GameFreak',
        	zip: '22122'
        };

        const result = await custService.patchCustomer(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockcustDao.patchCustomer
            .mockImplementation(() => ({}));

        const payload = {
            id: undefined,
            firstName: 'Reshi',
	        lastName: '',
        	address: 'Pokemon Black',
        	city: '',
	        state: 'GameFreak',
        	zip: '22122'
        };

        try {
            await custService.patchCustomer(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});


describe('addCustomer', () => {
    test('422 returned if no last name is provided', async () => {
        
        expect.assertions(1);
        
        mockcustDao.addCustomer.mockImplementation(() => ({}));

        const payload = {
            id: undefined,
            firstName: 'Reshi',
	        lastName: '',
        	address: 'Pokemon Black',
        	city: 'Bronx',
	        state: 'GameFreak',
        	zip: '22122'
        }

        try {
            // This async function should reject due to missing last name
            await custService.addCustomer(payload);
            fail('cardService.addCard did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
     
    });
    

});
