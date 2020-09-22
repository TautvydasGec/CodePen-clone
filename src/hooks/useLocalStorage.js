import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

const useLocalStorage = (key, innitialValue) => {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof innitialValue === 'function') {
      return innitialValue()
    } else {
      return innitialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage
