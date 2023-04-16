import React, { useState, useCallback } from 'react'
import './Example.css'
import { CurrentConfig } from '../config'
import { quote, swap } from '../libs/quote'
import { getProvider } from '../libs/providers'


const Example = () => {
  const [outputAmount, setOutputAmount] = useState<string>()
  const [result, setResult] = useState<string>()
  const [network, setNetwork] = useState<string>()

  const onQuote = useCallback(async () => {
    setOutputAmount(await quote())
  }, [])

  const onSwap = useCallback(async () => {
    setResult(await swap())
  }, [])

  const onNetwork = useCallback(async () => {
    setNetwork((await getProvider().getNetwork()).chainId.toString())
  }, [])

  onNetwork()

  return (
    <div className="App">
      {CurrentConfig.rpc.mainnet === '' && (
        <h2 className="error">Please set your mainnet RPC URL in config.ts</h2>
      )}
      <h3>{`Network: ${network}`}</h3>
      <h3>{`Quote input amount: ${CurrentConfig.tokens.amountIn} ${CurrentConfig.tokens.in.symbol}`}</h3>
      <h3>{`Quote output amount: ${outputAmount} ${CurrentConfig.tokens.out.symbol}`}</h3>
      <button onClick={onQuote}>
        <p>Quote</p>
      </button>
      <button onClick={onSwap}>
        <p>Swap</p>
      </button>
      <h3>{result && `Swap result: ${outputAmount} ${CurrentConfig.tokens.out.symbol}`}</h3>
    </div>
  )
}

export default Example
