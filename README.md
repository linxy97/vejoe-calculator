
## To start the app

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# veJoe Boost Calculator Design

Created: April 15, 2022 7:06 PM

# Background

veJoe is a token accrued by staking JOE into the veJoe staking section. veJoe provide wallet access to boosted awards in select boosted farms when it is held in a wallet.

# Goal

The goal is to create a calculator that provides customers clear information on annualized return on investment.

# User Story

- User selects a boosted farm
- User simulates adding liquidity to that pool
    - E.g. for JOE/AVAX, it has input fields to simulate how much JOE and how much AVAX user would like to add (whilst maintaining the JOE:AVAX ratio)
- User simulates how much veJOE he holds
- Calculator outputs:
    - veJOE share
    - Base APR
    - Current Boosted APR
    - Estimated Boosted APR
    - As well as any other additional info you might find useful

# Requirements

- Must be coded in **React**.
- Must use on-chain data (no mock data).
- Must be accurate.
- Must follow the user story

# Solutions

The solution has a few sections

1. 
2. [Calculation](https://www.notion.so/veJoe-Boost-Calculator-Design-8646f1999760408184f2d98775b35fe3): Section to ensure correction of calculations using on-chain data

# 1. Network calls

## 1.1 Provider

- AVAX: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
- ETH: [https://cloudflare-eth.com](https://cloudflare-eth.com/)

## 1.2. Contracts Used

### 1.2.1 BMCJ Farm

```jsx
'BMCJ': 0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F
```

### 1.2.2 Token Price Oracle

```jsx
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
```

## 1.3. Data fetched on-chain

### From BMCJ contract

1. JoePerSec
2. totalAllocPoint
3. poolInfo(pool number)

### From Pool Contract inside `poolInfo`

1. decimals
2. totalSupply
3. getReserves
4. token0
5. token1

### From each Token Contract inside `Pool Contract`

1. symbol
2. name
3. decimals
4. balanceOf(poolAddress)

## From Price Oracle

1. latestPrice

# 2. Calculations

## 2.0 Precondition

### Reward

$$
reward = reward_{base}+reward_{veJoe}
$$

### Base reward

$$
reward_{base} = \frac{userInput.liquidity * joePerSec * (1-veJoeShare)}{Pool[i].totalLpSupply}
$$

**where**

$$
joePerSec = BMCJ.joePerSec * \frac{Pool[i].allocPoint}{ BMCJ.totalAllocPoint}
$$

**and**

$$
veJoeShare = \frac{Pool[i].veJoeShareBp}{10,000}
$$

### Boosted reward

$$
reward_{veJoe} = \frac{\sqrt{userInput.liquidity * userInput.veJoe}*joePerSec * veJoeShare}{Pool[i].totalFactor}
$$

### Liquidity

$$
liquidity = \min(
                \frac{amount0}{reserve0},\frac{amount1}{reserve1}) * totalSupply;
$$

## 2.1. veJoe Share

Split of veJOE vs Base Rewards are determined by a veJoeShareBp setting configured at a farm level and managed by the protocol team.

$$
veJoeShare = \frac{Pool[i].veJoeShareBp}{10,000}
$$

## 2.2. base APR

$$
APR_{base} = \frac{AnnualizedReward_{base}}{\text{LP token cost in Joe}}
$$

where

$$
AnnualizedReward_{base} = \frac{reward_{base}}{sec} * \frac{60^2*24*265sec}{ year}
$$

and

$$
\text{LP token cost in Joe} = liquidity * cost_{liquidity}
$$

and

$$
cost_{liquidity} = token0 * \frac{P_{joe}}{P_{crypto0}} * 2
$$

`*token 0` is the amount of token 0 user input*

`*P_token0`is the price of token 0 in $*

## 2.3 current boosted APR

This will be 0 if customer does not currently have veJoe token

## 2.4 boosted APR

$$
APR_{boosted} = \frac{AnnualizedReward_{base} + AnnualizedReward_{boosted}}{\text{LP token cost in Joe}}
$$

# 3 UI

# Appendix

## Glossary

**Farm Factor** - Measures the proportion of total rewards vs the base rewards emitted to the farm.

**totalFactor -** Farm Total Factor is then the sum of all User Farm (available in contract)