import { ethers, providers } from 'ethers'
import { CurrentConfig } from '../config'

// Provider Functions

export function getProvider(): providers.Provider {
  return new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.rsk.test)
}

const wallet = createWallet()

function createWallet(): ethers.Wallet {
  return new ethers.Wallet(CurrentConfig.wallet.privateKey, getProvider())
}

export function getWalletAddress(): string | undefined {
  return wallet.address
}

export function getWallet(): ethers.Wallet {
  return wallet;
}
