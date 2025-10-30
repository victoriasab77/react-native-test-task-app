import { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import type { ListRenderItem } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { useActivitiesQuery } from '@services/activities'
import { RootStackRoute, RootStackScreenProps } from './types/root'
import type { Activity } from '@types'

import { ActivityCard, LoadingState, ErrorState } from '@components'
import { texts } from '@texts'

const HomeScreen = ({
  navigation,
}: RootStackScreenProps<RootStackRoute.HOME>) => {
  const { data, isLoading, error, refetch } = useActivitiesQuery()

  const activities = data ?? []
  const [isRefreshing, setIsRefreshing] = useState(false)

  const renderItem: ListRenderItem<Activity> = useCallback(
    ({ item }) => (
      <ActivityCard
        activity={item}
        onPress={() =>
          navigation.navigate(RootStackRoute.DETAILS, {
            activityId: item.id,
          })
        }
        isFavourite={item.isFavourite}
      />
    ),
    [navigation],
  )

  const keyExtractor = useCallback((item: Activity) => item.id.toString(), [])

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <LoadingState
          message={texts.home.loading}
          className="flex-1 items-center justify-center py-10"
        />
      )
    }

    if (error) {
      return (
        <ErrorState
          message={texts.home.error}
          className="flex-1 items-center justify-center py-10"
        />
      )
    }

    return null
  }, [error, isLoading])

  const listData = isLoading || error ? [] : activities

  const contentContainerClassName =
    isLoading || error ? 'flex-1 justify-center px-4' : 'py-6 px-4'

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsRefreshing(false)
    }
  }, [refetch])

  return (
    <SafeAreaView
      className="flex-1 bg-white pt-safe"
      edges={['right', 'bottom', 'left']}
    >
      <View className="mb-3 items-center">
        <Text className="font-abelregular text-[16px] text-[#000000]">
          {texts.home.title}
        </Text>
      </View>
      <FlatList
        data={listData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerClassName={contentContainerClassName}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
