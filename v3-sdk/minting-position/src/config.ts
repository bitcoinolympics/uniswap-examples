import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { tRIF_TOKEN, SOV_TOKEN, rDOC_TOKEN, Token0, Token1 } from './libs/constants'

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  MAINNET,
  RSK_TESTNET,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
    rsk: {
      testnet: string
      mainnet: string
    }
  }
  wallet: {
    address: string
    privateKey: string
  }
  tokens: {
    token0: Token
    token0Amount: number
    token1: Token
    token1Amount: number
    poolFee: FeeAmount
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.RSK_TESTNET,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
    rsk: {
      testnet: 'https://public-node.testnet.rsk.co',
      mainnet: 'https://public-node.rsk.co',
    },
  },
  wallet: {
    address: '0x82437eaE4D114EB2c64E5C734eE088EDBaF73A4E',
    privateKey:
      '0x73840f31b18b4ae0a1816e77f3727f75e4c01eae3ee617a0de95c3f3916706f4',
  },
  tokens: {
    token0: SOV_TOKEN,
    token0Amount: 10,
    token1: rDOC_TOKEN,
    token1Amount: 4,
    poolFee: FeeAmount.MEDIUM,
  },
}
