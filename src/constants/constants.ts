import { writeHeapSnapshot } from "v8";

/**
 * Currently there are 13 farms supported
 */
export const FARMS = [
    ['AVAX', 'USDC'],
    ['WETH.e', 'AVAX'],
    ['AVAX', 'USDT.e'],
    ['USDC.e', 'AVAX'],
    ['AVAX', 'MIM'],
    ['AVAX', 'WBTC.e'],
    ['AVAX', 'JOE'],
    ['JOE', 'USDC'],
    ['USDC.e', 'USDC'],
    ['USDT.e', 'USDT'],
    ['AVAX', 'LINK.e'],
    ['AVAX', 'BNB'],
    ['AVAX', 'USDT'],
]

// export const COIN_DECIMAL = {
//     'AVAX': 18,
//     'USDC': 6,
//     'USDT': 6,
//     'WETH.e': 18,
//     'USDT.e': 6,
//     'USDC.e': 6,
//     'MIM': x,
//     'WBTC.e': x,
//     'JOE': x,
//     'LINK.e': x,
//     'BNB': x,
// }