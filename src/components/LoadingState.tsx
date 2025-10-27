import {
  ActivityIndicator,
  Text,
  View,
  type ActivityIndicatorProps,
} from 'react-native'
import type { FC } from 'react'

type LoadingStateProps = {
  message?: string
  indicatorSize?: ActivityIndicatorProps['size']
  className?: string
  textClassName?: string
}

const LoadingState: FC<LoadingStateProps> = ({
  message,
  indicatorSize = 'large',
  className = 'flex-1 items-center justify-center',
  textClassName = 'mt-3 font-sfregular text-[14px] text-[#999]',
}) => (
  <View className={className}>
    <ActivityIndicator size={indicatorSize} />
    {message ? <Text className={textClassName}>{message}</Text> : null}
  </View>
)

export default LoadingState
