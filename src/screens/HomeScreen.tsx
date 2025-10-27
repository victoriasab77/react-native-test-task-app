import { useCallback } from 'react'
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native'
import type { ListRenderItem } from 'react-native'
import ActivityCard from '@/components/ActivityCard'
import { activitiesMock, type Activity } from '@/mocks/activities'
import { RootStackScreenProps } from './types/root'

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const renderItem: ListRenderItem<Activity> = useCallback(
    ({ item }) => (
      <ActivityCard
        activity={item}
        onPress={() => navigation.navigate('Details', { activity: item })}
        isFavourite
      />
    ),
    [navigation],
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="mb-3 items-center">
        <Text className="font-abelregular text-[16px] text-[#000000]">
          Activities
        </Text>
      </View>
      <FlatList
        data={activitiesMock}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
})

export default HomeScreen
