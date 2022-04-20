import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenSourceMapRange } from 'typescript';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { PRICE_ORACLE_ADDRESS } from '../constants/constants';

const CONSTANTS = {
    NODE_URL: 'https://api.avax.network/ext/bc/C/rpc',
    BMCJ_ADDRESS: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F',
    BMCJ_ABI: require('../abi/bmcj.json'),
    PAIR_ABI: require('../abi/pair.json'),
    COIN_ABI: require('../abi/coin.json'),
}
export const PMCJ_API = {
    // TODO: typing
    fetchJoePerSec: async (): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);
    
        let joePerSec;
        // fetch joePerSec
        await contract.methods.joePerSec().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                joePerSec = result;
            };
        });
        return joePerSec;
    },
    fetchTotalAllocPoint: async (): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);
        let totalAllocPoint;
        // fetch joePerSec
        await contract.methods.totalAllocPoint().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                totalAllocPoint = result;
            };
        });
        return totalAllocPoint;
    },
    fetchPoolInfo: async (poolNumber: number): Promise<any> => {
        // Web3 constants;
        const bmcjAbi = CONSTANTS.BMCJ_ABI;
        const { contract } = initializeWeb3Contract(bmcjAbi, CONSTANTS.BMCJ_ADDRESS);
        let poolInfo;
        // fetch joePerSec
        await contract.methods.poolInfo(poolNumber).call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                poolInfo = result;
            };
        });
        return poolInfo;
    },
}

export type pair_api_type = {
            reserves: any,
            kLast: any,
            price0CumulativeLast: any,
            price1CumulativeLast: any,
            totalSupply: any,
            decimals: any,
            token0: any,
            token1: any
}
export type token_type = {
    symbol: any,
    name: any,
    balance: any,
    decimals: any
}

export const PAIR_API = {
    fetchAll: async (address: string): Promise<any> => {
        // Web3 constants;
        const pairApi = CONSTANTS.PAIR_ABI;
        const { contract } = initializeWeb3Contract(pairApi, address);
    
        let pairValues: pair_api_type = {
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
                console.log(err)
            } else {
                pairValues['kLast'] = result;
            };
        });
        await contract.methods.price0CumulativeLast().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['price0CumulativeLast'] = result;
            };
        });
        await contract.methods.price1CumulativeLast().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['price1CumulativeLast'] = result;
            };
        });
        await contract.methods.totalSupply().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['totalSupply'] = result;
            };
        });
        await contract.methods.decimals().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['decimals'] = result;
            };
        });
        await contract.methods.getReserves().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['reserves'] = result;
            };
        });
        await contract.methods.token0().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['token0'] = result;
            };
        });
        await contract.methods.token1().call((err: any, result: any) => {
            if (err) {
                console.log(err)
            } else {
                pairValues['token1'] = result;
            };
        });
        return pairValues;
    },
}

export const COIN_API = {
    getCoinInfos: async (poolAddress: string, address1: string, address2: string) => {
        const token0 = await COIN_API.getCoinInfo(poolAddress, address1);
        const token1 = await COIN_API.getCoinInfo(poolAddress, address2);
        return {token0, token1};
    },
    getCoinInfo: async (poolAddress: string, address: string): Promise<any> => {
            // Web3 constants;
            const coinABI = CONSTANTS.COIN_ABI;
            const { contract } = initializeWeb3Contract(coinABI, address);
        
            let coinInfo: token_type = {
                symbol: null,
                name: null,
                balance: null,
                decimals: null
            };
            // fetch reserves
            await contract.methods.symbol().call((err: any, result: any) => {
                if (err) {
                    console.log(err)
                } else {
                    coinInfo['symbol'] = result;
                };
            });
            await contract.methods.name().call((err: any, result: any) => {
                if (err) {
                    console.log(err)
                } else {
                    coinInfo['name'] = result;
                };
            });
            await contract.methods.decimals().call((err: any, result: any) => {
                if (err) {
                    console.log(err)
                } else {
                    coinInfo['decimals'] = result;
                };
            });
            await contract.methods.balanceOf(poolAddress).call((err: any, result: any) => {
                if (err) {
                    console.log(err)
                } else {
                    coinInfo['balance'] = result;
                };
            });
            console.log(coinInfo);
            return coinInfo;
    }
}

export const TOKEN_ORACLE_API = {
    getTokenPriceInUSD: async (token: string) => {
        if (token === 'JOE') {
            return await TOKEN_ORACLE_API.getJOEToken();
        }
        return await TOKEN_ORACLE_API.getToken(token);
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

const initializeWeb3Contract = (contractAbi: AbiItem, address: string) => {
    const provider = new Web3.providers.HttpProvider(CONSTANTS.NODE_URL);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractAbi, address);
    return {web3, contract};
}
