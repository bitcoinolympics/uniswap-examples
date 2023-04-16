// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token } from '@uniswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x645eaefA3dfE93b6140e4AB68113f56Fb1910Ca8'
export const QUOTER_CONTRACT_ADDRESS =
  '0x2E02F710352AAaE3111A412Cc2fF4541D00E042E'

export const RSK_TESTNET = 31

export const hardhatChainId = 31337

// Currencies and Tokens

export const WETH_TOKEN = new Token(
  RSK_TESTNET,
  '0xcCe3E0BAeFb57e96B6a61aCd5119BdF5C0452178',
  18,
  'WETH',
  'Wrapped Ether'
)

export const USDC_TOKEN = new Token(
  hardhatChainId,
  '0x5D3F6015fEdC9c112aA53CBb0c82Cd6F6dfbc251',
  6,
  'USDC',
  'USD//C'
)

export const SOV_TOKEN = new Token(
  RSK_TESTNET,
  '0x6a9A07972D07e58F0daf5122d11E069288A375fb',
  18,
  'SOV',
  'Sovryn Token'
)

export const tRIF_TOKEN = new Token(
  RSK_TESTNET,
  '0x19F64674D8A5B4E652319F5e239eFd3bc969A1fE',
  18,
  'rTIF',
  'tRIF Token'
)

export const RBTC_TOKEN = new Token(
  RSK_TESTNET,
  '0xE53d858A78D884659BF6955Ea43CBA67c0Ae293F',
  18,
  'RBTC',
  'RBTC'
)

export const rDOC_TOKEN = new Token(
  RSK_TESTNET,
  '0xC3De9F38581f83e281f260d0DdbaAc0e102ff9F8',
  18,
  'rDOC',
  'rDOC'
)

export const Token0 = new Token(
  hardhatChainId,
  '0xCF9C83be89ac927F9D98F0CaFB9ED7fDea2fD459',
  18,
  'TK0',
  'Token 0'
)

export const Token1 = new Token(
  hardhatChainId,
  '0x5D3F6015fEdC9c112aA53CBb0c82Cd6F6dfbc251',
  18,
  'TK1',
  'Token 1'
)

export const MAX_FEE_PER_GAS = '10000000000'
export const MAX_PRIORITY_FEE_PER_GAS = '10000000000'
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = "10000000000000000000000000"


export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]