import { useCallback } from 'react'
import { SafeAreaView, FlatList, Text, View } from 'react-native'
import type { ListRenderItem } from 'react-native'
import ActivityCard from '@/components/ActivityCard'
import LoadingState from '@/components/LoadingState'
import ErrorState from '@/components/ErrorState'
import { useActivitiesQuery, type Activity } from '@/services/activities'
import { RootStackScreenProps } from './types/root'

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const { data, isLoading, error } = useActivitiesQuery()
  const activities = data ?? []

  const renderItem: ListRenderItem<Activity> = useCallback(
    ({ item }) => (
      <ActivityCard
        activity={item}
        onPress={() => navigation.navigate('Details', { activityId: item.id })}
        isFavourite={item.isFavourite}
      />
    ),
    [navigation],
  )

  const keyExtractor = useCallback((item: Activity) => item.id.toString(), [])

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <LoadingState className="flex-1 items-center justify-center py-10" />
      )
    }

    if (error) {
      return (
        <ErrorState
          message="Failed to load activities"
          className="flex-1 items-center justify-center py-10"
        />
      )
    }

    return null
  }, [error, isLoading])

  const listData = isLoading || error ? [] : activities
  const contentContainerClassName =
    isLoading || error ? 'flex-1 justify-center px-4' : 'py-6 px-4'

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mb-3 items-center">
        <Text className="font-abelregular text-[16px] text-[#000000]">
          Activities
        </Text>
      </View>
      <FlatList
        data={listData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerClassName={contentContainerClassName}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
