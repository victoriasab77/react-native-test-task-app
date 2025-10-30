import {
  ActivityIndicator,
  Text,
  View,
  type ActivityIndicatorProps,
} from 'react-native'

interface LoadingStateProps {
  message?: string
  indicatorSize?: ActivityIndicatorProps['size']
  className?: string
  textClassName?: string
}

const LoadingState = ({
  message,
  indicatorSize = 'large',
  className = 'flex-1 items-center justify-center',
  textClassName = 'mt-3 font-sfregular text-label text-secondary',
}: LoadingStateProps) => {
  return (
    <View className={className}>
      <ActivityIndicator size={indicatorSize} />
      {message ? <Text className={textClassName}>{message}</Text> : null}
    </View>
  )
}

export default LoadingState
