import { useCallback } from 'react'

import useEmoji from './useEmoji'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../emoji/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const emoji = useEmoji()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(emoji),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, emoji],
  )

  return { onStake: handleStake }
}

export default useStake
