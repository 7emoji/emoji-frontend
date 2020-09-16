import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useEmoji from '../../hooks/useEmoji'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../emoji/utils'
import { getFarms } from '../../emoji/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const emoji = useEmoji()
  const { account } = useWallet()

  const farms = getFarms(emoji)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
