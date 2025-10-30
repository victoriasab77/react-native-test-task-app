import { useCallback, useMemo } from 'react'
import { FlatList } from 'react-native'
import type { ListRenderItem } from 'react-native'

import type { Activity } from '@types'
import ActivityCard from './ActivityCard'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import { texts } from '@texts'

type ActivityListProps = {
  activities: Activity[]
  isLoading: boolean
  error: Error | null
  refreshing: boolean
  onRefresh: () => void
  onActivityPress: (activity: Activity) => void
}

const ActivityList = ({
  activities,
  isLoading,
  error,
  refreshing,
  onRefresh,
  onActivityPress,
}: ActivityListProps) => {
  const { loading, errorMessage } = texts.home

  const renderItem: ListRenderItem<Activity> = useCallback(
    ({ item }) => (
      <ActivityCard
        activity={item}
        onPress={() => onActivityPress(item)}
        isFavourite={item.isFavourite}
      />
    ),
    [onActivityPress],
  )

  const keyExtractor = useCallback((item: Activity) => item.id.toString(), [])

  const listData = useMemo(
    () => (isLoading || error ? [] : activities),
    [activities, error, isLoading],
  )

  const contentContainerClassName = useMemo(
    () => (isLoading || error ? 'flex-1 justify-center px-4' : 'py-6 px-4'),
    [error, isLoading],
  )

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <LoadingState
          message={loading}
          className="flex-1 items-center justify-center py-10"
        />
      )
    }

    if (error) {
      return (
        <ErrorState
          message={errorMessage}
          className="flex-1 items-center justify-center py-10"
        />
      )
    }

    return null
  }, [error, errorMessage, isLoading, loading])

  return (
    <FlatList
      data={listData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerClassName={contentContainerClassName}
      ListEmptyComponent={renderEmptyComponent}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ActivityList
