import { useCallback } from 'react'

import useEmoji from './useEmoji'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../emoji/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const emoji = useEmoji()
  const masterChefContract = getMasterChefContract(emoji)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, emoji],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
