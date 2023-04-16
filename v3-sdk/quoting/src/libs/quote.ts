import { BigNumber, ethers } from 'ethers'
import { CurrentConfig } from '../config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import { CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  ERC20_ABI,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
} from '../libs/constants'
import { getProvider, getWallet, getWalletAddress } from '../libs/providers'
import { toReadableAmount, fromReadableAmount } from '../libs/conversion'


export async function quote(): Promise<string> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants()

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    0
  )

  console.log(`Quoted Amount Out: ${quotedAmountOut}`)

  return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals)
}

export async function swap(): Promise<string> {

  const address = getWalletAddress()
  const provider = getProvider()

  // Give approval to the contract to transfer tokens
  const tokenInApproval = await getTokenTransferApproval(
    CurrentConfig.tokens.in
  )
  console.log('tokenInApproval', tokenInApproval)

  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider
  )
  const poolConstants = await getPoolConstants()

  const transaction = await quoterContract.populateTransaction.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    ).toString(),
    0
  )

  sendTransaction({...transaction, from: address})

  const quotedAmountOut = transaction.value ? transaction.value.toNumber() : 0

  console.log(`Quoted Amount Out: ${quotedAmountOut}`)

  return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals)
}

async function getPoolConstants(): Promise<{
  token0: string
  token1: string
  fee: number
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  })

  console.log(`Pool Address: ${currentPoolAddress}`)

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  )

  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  console.log(`Token 0: ${token0}; Token 1: ${token1}; Fee: ${fee}`)

  return {
    token0,
    token1,
    fee,
  }
}

export async function getTokenTransferApproval(
  token: Token
): Promise<string> {
  const provider = getProvider()
  const address = getWalletAddress()

  try {
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_ABI,
      provider
    )

    const transaction = await tokenContract.populateTransaction.approve(
      QUOTER_CONTRACT_ADDRESS,
      BigNumber.from(TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER)
    )

    return sendTransaction({
      ...transaction,
      from: address,
    })
  } catch (e) {
    console.error(e)
    return "FAILED"
  }
}

async function sendTransaction(
  transaction: ethers.providers.TransactionRequest
): Promise<string> {
  if (transaction.value) {
    transaction.value = BigNumber.from(transaction.value)
  }
  console.log(`Sending transaction:`, transaction)
  const txRes = await getWallet().sendTransaction(transaction)
  console.log(`Transaction result:`, txRes)
  let receipt = null
  const provider = getProvider()

  while (receipt === null) {
    try {
      receipt = await provider.getTransactionReceipt(txRes.hash)

      if (receipt === null) {
        continue
      }
    } catch (e) {
      console.log(`Receipt error:`, e)
      break
    }
  }

  // Transaction was successful if status === 1
  if (receipt) {
    console.log(`Transaction receipt: ${receipt}`)
    return "SENT"
  } else {
    return "FAILED"
  }
}