import {fizzbuzz} from '../src/fizzbuzz';
describe('fizzbuzz', () => {

    test('returns fizz when input is 3', () => {
            expect(fizzbuzz(3)).toEqual('fizz');
    });

    test('returns buzz when input is 5', () => {
        expect(fizzbuzz(5)).toEqual('buzz');
    });

    test('returns fizzbuzz when input is 15', () => {
        expect(fizzbuzz(15)).toEqual('fizzbuzz');
    });

    test('returns failure when input is 17', () => {
        expect(fizzbuzz(17)).toEqual('How can you lose at life?!');
    });

});