// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token } from '@uniswap/sdk-core'
import { encodeSqrtRatioX96 } from "@uniswap/v3-sdk";
import JSBI from 'jsbi';

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x645eaefA3dfE93b6140e4AB68113f56Fb1910Ca8'
export const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
  '0x650824EaddD2d12cb918286b1B2Dd9F66726961d'

export const RSK_TESTNET = 31
export const hardhatLocal = 31337

// Currencies and Tokens

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
)

export const DAI_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
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

export const rDOC_TOKEN = new Token(
  RSK_TESTNET,
  '0xC3De9F38581f83e281f260d0DdbaAc0e102ff9F8',
  18,
  'rDOC',
  'rDOC'
)

export const Token0 = new Token(
  hardhatLocal,
  '0xCF9C83be89ac927F9D98F0CaFB9ED7fDea2fD459',
  18,
  'TK0',
  'Token 0'
)

export const Token1 = new Token(
  hardhatLocal,
  '0x5D3F6015fEdC9c112aA53CBb0c82Cd6F6dfbc251',
  18,
  'TK1',
  'Token 1'
)

// Transactions

export const MAX_FEE_PER_GAS = '10000000000'
export const MAX_PRIORITY_FEE_PER_GAS = '10000000000'
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = "10000000000000000000000000"

// ABI's

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

export const NONFUNGIBLE_POSITION_MANAGER_ABI = [
  // Read-Only Functions
  'function balanceOf(address _owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',

  'function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
]
