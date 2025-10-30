import { Text, View } from 'react-native'
import type { FC, ReactNode } from 'react'

type ErrorStateProps = {
  message: string
  className?: string
  messageClassName?: string
  children?: ReactNode
}

const ErrorState: FC<ErrorStateProps> = ({
  message,
  className = 'flex-1 items-center justify-center',
  messageClassName = 'font-sfregular text-center text-label text-secondary',
  children,
}) => (
  <View className={className}>
    <Text className={messageClassName}>{message}</Text>
    {children}
  </View>
)

export default ErrorState
