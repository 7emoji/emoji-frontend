import { useContext } from 'react'
import { Context } from '../contexts/EmojiProvider'

const useEmoji = () => {
  const { emoji } = useContext(Context)
  return emoji
}

export default useEmoji
