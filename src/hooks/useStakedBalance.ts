import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../emoji/utils'
import useEmoji from './useEmoji'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const emoji = useEmoji()
  const masterChefContract = getMasterChefContract(emoji)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, emoji])

  useEffect(() => {
    if (account && emoji) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, emoji])

  return balance
}

export default useStakedBalance
