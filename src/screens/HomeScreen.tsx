import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from './types/root'

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  return (
    <View style={styles.container}>
      <Text>Hello, developer</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text>Go to details</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen
