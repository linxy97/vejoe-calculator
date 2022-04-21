import Web3 from 'web3';
import { PRICE_ORACLE_ADDRESS } from '../constants/constants';

export const TokenOracleApi = {
    getTokenPriceInUSD: async (token: string) => {
        if (token === 'JOE') {
            return await TokenOracleApi.getJOEToken();
        }
        return await TokenOracleApi.getToken(token);
    },
    getJOEToken: async () => {
        try {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
              } as any;
            const result = await fetch("https://api.traderjoexyz.com/priceusd/0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd", requestOptions)
                .then(response => response.text())
                .catch(error => console.log('error', error));
            console.log(result)
            return Number(result) * Math.pow(10, -18);
        } catch (error) {
            console.error(error)
        }
        
    },
    getToken: async (token: string) => {
        const provider = new Web3.providers.HttpProvider('https://cloudflare-eth.com');
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(PRICE_ORACLE_ADDRESS[token].abi, PRICE_ORACLE_ADDRESS[token].address);
        let tokenPrice;
        await contract.methods.latestAnswer().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                tokenPrice = result;
            };
        });
        return tokenPrice * Math.pow(10, -8);
    },
}

