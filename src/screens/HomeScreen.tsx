import { useCallback } from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import type { ListRenderItem } from 'react-native'
import ActivityCard from '@/components/ActivityCard'
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

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Failed to load activities</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 justify-center  bg-white">
      <View className="mb-3 items-center">
        <Text className="font-abelregular text-[16px] text-[#000000]">
          Activities
        </Text>
      </View>
      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
})

export default HomeScreen
