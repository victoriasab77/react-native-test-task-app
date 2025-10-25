import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import type { ListRenderItem } from 'react-native'
import ActivityCard from '@/components/ActivityCard'
import { activitiesMock, type Activity } from '@/mocks/activities'
import { RootStackScreenProps } from './types/root'

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const renderActivity: ListRenderItem<Activity> = ({ item }) => (
    <ActivityCard
      activity={item}
      onPress={() => navigation.navigate('Details')}
    />
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={activitiesMock}
        keyExtractor={item => item.id.toString()}
        renderItem={renderActivity}
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
