import * as orderService from '../../src/services/orders-service';
import * as orderDao from '../../src/daos/orders-dao';


jest.mock('../../src/daos/orders-dao');

const mockorderDao = orderDao as any;

describe('patchSystem', () => {
    /* Testing behavior of patchPerson */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockorderDao.patchSystem
            .mockImplementation(() => ({}));

        const payload = {
            id: "2",
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            undefined,
            price: '1699.99'
        };

        const result = await orderService.patchSystem(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockorderDao.patchSystem
            .mockImplementation(() => ({}));

        const payload = {
            id: undefined,
            //id: "2",
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            undefined,
            price: '1699.99'
        };

        try {
            await orderService.patchSystem(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});



describe('addSystem', () => {
    test('422 returned if no processor type provided', async () => {
        
        expect.assertions(1);
        
        mockorderDao.addSystem.mockImplementation(() => ({}));

        const payload = {
            id: undefined,
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: undefined,
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            undefined,
            price: '1699.99'
        }

        try {
            // This async function should reject due to missing processor
            await orderService.addSystem(payload);
            fail('cardService.addCard did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
     
    });
    

});