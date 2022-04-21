import { CONSTANTS, initializeWeb3Contract } from './api-helper';
import { PairResponseType } from './api-type';


export const PairApi = {
    fetchAll: async (address: string): Promise<any> => {
        // Web3 constants;
        const pairApi = CONSTANTS.PAIR_ABI;
        const { contract } = initializeWeb3Contract(pairApi, address);

        let pairValues: PairResponseType = {
            reserves: null,
            kLast: null,
            price0CumulativeLast: null,
            price1CumulativeLast: null,
            totalSupply: null,
            decimals: null,
            token0: null,
            token1: null,
        };
        // fetch reserves
        await contract.methods.kLast().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['kLast'] = result;
            };
        });
        await contract.methods.price0CumulativeLast().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['price0CumulativeLast'] = result;
            };
        });
        await contract.methods.price1CumulativeLast().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['price1CumulativeLast'] = result;
            };
        });
        await contract.methods.totalSupply().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['totalSupply'] = result;
            };
        });
        await contract.methods.decimals().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['decimals'] = result;
            };
        });
        await contract.methods.getReserves().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['reserves'] = result;
            };
        });
        await contract.methods.token0().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['token0'] = result;
            };
        });
        await contract.methods.token1().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                pairValues['token1'] = result;
            };
        });
        return pairValues;
    },
};
