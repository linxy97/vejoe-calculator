const JOE_TOKEN_ORACLE = require('../abi/joe_token_oracle.json');
const CHAINLINK_TOKEN_ORACLE = require('../abi/bnb_token_oracle.json');

/**
 * Currently there are 13 farms supported
 */
export const FARMS = [
    ['AVAX', 'USDC'],
    ['WETH.e', 'AVAX'],
    ['AVAX', 'USDT.e'],
    ['USDC.e', 'AVAX'],
    ['AVAX', 'MIM'],
    ['WBTC.e', 'AVAX'],
    ['AVAX', 'JOE'],
    ['JOE', 'USDC'],
    ['USDC.e', 'USDC'],
    ['USDT.e', 'USDT'],
    ['AVAX', 'LINK.e'],
    ['AVAX', 'BNB'],
    ['AVAX', 'USDT'],
]

export const SECOND_TO_ANNUALIZE = (n: number) => n * 3600 * 24 * 365
export const SECOND_TO_DAY = (n: number) => n * 3600 * 24

export const DECIMALS_POW = (input: any) => Math.pow(10, Number(input));

export const PRICE_ORACLE_ADDRESS = {
    'AVAX': {
        address: '0xff3eeb22b5e3de6e705b44749c2559d704923fd7',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'USDC': {
        address: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'USDC.e': {
        address: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'WETH.e': {
        address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'USDT.e': {
        address: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'USDT': {
        address: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'MIM': {
        address: '0x7a364e8770418566e3eb2001a96116e6138eb32f',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'WBTC.e': {
        address: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'LINK.e': {
        address: '0x2c1d072e956affc0d435cb7ac38ef18d24d9127c',
        abi: CHAINLINK_TOKEN_ORACLE
    },
    'BNB': {
        address: '0x14e613ac84a31f709eadbdf89c6cc390fdc9540a',
        abi: CHAINLINK_TOKEN_ORACLE
    }
}
