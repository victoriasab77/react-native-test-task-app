import { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { useActivitiesQuery } from '@services/activities'
import { RootStackRoute, RootStackNavigationProp } from './types/root'
import type { Activity } from '@types'

import { ActivityList } from '@components'
import { texts } from '@texts'

const HomeScreen = () => {
  const navigation =
    useNavigation<RootStackNavigationProp<RootStackRoute.HOME>>()
  const { data, isLoading, error, refetch } = useActivitiesQuery()

  const activities = data ?? []
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { title } = texts.home

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsRefreshing(false)
    }
  }, [refetch])

  const handleActivityPress = useCallback(
    (item: Activity) => {
      navigation.navigate(RootStackRoute.DETAILS, {
        activityId: item.id,
      })
    },
    [navigation],
  )

  return (
    <SafeAreaView
      className="flex-1 bg-white pt-safe"
      edges={['right', 'bottom', 'left']}
    >
      <View className="mb-3 items-center">
        <Text className="font-abelregular text-body text-primary">{title}</Text>
      </View>
      <ActivityList
        activities={activities}
        isLoading={isLoading}
        error={error ?? null}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onActivityPress={handleActivityPress}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
