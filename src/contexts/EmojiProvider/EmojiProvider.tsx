import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Emoji } from '../../emoji'

export interface EmojiContext {
  emoji?: typeof Emoji
}

export const Context = createContext<EmojiContext>({
  emoji: undefined,
})

declare global {
  interface Window {
    emojisauce: any
  }
}

const EmojiProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [emoji, setEmoji] = useState<any>()

  // @ts-ignore
  window.emoji = emoji
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const emojiLib = new Emoji(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setEmoji(emojiLib)
      window.emojisauce = emojiLib
    }
  }, [ethereum])

  return <Context.Provider value={{ emoji }}>{children}</Context.Provider>
}

export default EmojiProvider
