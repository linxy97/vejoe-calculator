import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export const CONSTANTS = {
    NODE_URL: 'https://api.avax.network/ext/bc/C/rpc',
    BMCJ_ADDRESS: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F',
    BMCJ_ABI: require('../abi/bmcj.json'),
    PAIR_ABI: require('../abi/pair.json'),
    COIN_ABI: require('../abi/coin.json'),
};

export const initializeWeb3Contract = (contractAbi: AbiItem, address: string) => {
    const provider = new Web3.providers.HttpProvider(CONSTANTS.NODE_URL);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractAbi, address);
    return {web3, contract};
}
