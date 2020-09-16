import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../emoji/utils'
import useEmoji from './useEmoji'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const emoji = useEmoji()
  const masterChefContract = getMasterChefContract(emoji)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, emoji])

  useEffect(() => {
    if (account && masterChefContract && emoji) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, emoji])

  return balance
}

export default useEarnings
