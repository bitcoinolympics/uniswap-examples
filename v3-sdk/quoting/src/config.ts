import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { RBTC_TOKEN, rDOC_TOKEN, SOV_TOKEN, Token0, Token1, tRIF_TOKEN, USDC_TOKEN, WETH_TOKEN } from './libs/constants'

// Inputs that configure this example to run
export interface ExampleConfig {
  rpc: {
    local: string
    mainnet: string
    rsk: {
      test: string
      main: string
    }
  }
  wallet: {
    address: string
    privateKey: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
    rsk: {
      test: 'https://public-node.testnet.rsk.co',
      main: 'https://public-node.rsk.co'
    }
  },
  wallet: {
    address: '0x82437eaE4D114EB2c64E5C734eE088EDBaF73A4E',
    privateKey:
      '0x73840f31b18b4ae0a1816e77f3727f75e4c01eae3ee617a0de95c3f3916706f4',
  },
  tokens: {
    in: SOV_TOKEN,
    amountIn: 10,
    out: rDOC_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
