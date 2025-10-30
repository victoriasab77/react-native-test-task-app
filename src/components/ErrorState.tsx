import { Text, View } from 'react-native'
import type { ReactNode } from 'react'

interface ErrorStateProps {
  message: string
  className?: string
  messageClassName?: string
  children?: ReactNode
}

const ErrorState = ({
  message,
  className = 'flex-1 items-center justify-center',
  messageClassName = 'font-sfregular text-center text-label text-secondary',
  children,
}: ErrorStateProps) => {
  return (
    <View className={className}>
      <Text className={messageClassName}>{message}</Text>
      {children}
    </View>
  )
}

export default ErrorState
