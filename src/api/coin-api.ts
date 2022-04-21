import { CONSTANTS, initializeWeb3Contract } from './api-helper';
import { TokenType } from './api-type';


export const CoinApi = {
    getTokenInfo: async (poolAddress: string, address1: string, address2: string) => {
        const token0 = await CoinApi.getCoinInfo(poolAddress, address1);
        const token1 = await CoinApi.getCoinInfo(poolAddress, address2);
        return { token0, token1 };
    },
    getCoinInfo: async (poolAddress: string, address: string): Promise<any> => {
        // Web3 constants;
        const coinABI = CONSTANTS.COIN_ABI;
        const { contract } = initializeWeb3Contract(coinABI, address);

        let coinInfo: TokenType = {
            symbol: null,
            name: null,
            balance: null,
            decimals: null
        };
        // fetch reserves
        await contract.methods.symbol().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                coinInfo['symbol'] = result;
            };
        });
        await contract.methods.name().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                coinInfo['name'] = result;
            };
        });
        await contract.methods.decimals().call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                coinInfo['decimals'] = result;
            };
        });
        await contract.methods.balanceOf(poolAddress).call((err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                coinInfo['balance'] = result;
            };
        });
        console.log(coinInfo);
        return coinInfo;
    }
};
