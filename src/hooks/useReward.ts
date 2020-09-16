import { useCallback } from 'react'

import useEmoji from './useEmoji'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../emoji/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const emoji = useEmoji()
  const masterChefContract = getMasterChefContract(emoji)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, emoji])

  return { onReward: handleReward }
}

export default useReward
