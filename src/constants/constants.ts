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

export const JOE_IMAGE_URL = 'https://764859236-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MYTkRFOHO4K48zVLh8x-2910905616%2Fuploads%2Fnmig5ugrL2w35GGpD3BN%2FTraderJoeVoxelBlack.png?alt=media&token=235013af-86d4-4480-831a-80a167c671a3';