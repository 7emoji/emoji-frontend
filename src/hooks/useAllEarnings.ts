import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../emoji/utils'
import useEmoji from './useEmoji'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const emoji = useEmoji()
  const farms = getFarms(emoji)
  const masterChefContract = getMasterChefContract(emoji)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, emoji])

  useEffect(() => {
    if (account && masterChefContract && emoji) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, emoji])

  return balances
}

export default useAllEarnings
