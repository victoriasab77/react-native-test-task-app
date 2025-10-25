import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { RootStackScreenProps } from './types/root'

const DetailsScreen = ({ navigation }: RootStackScreenProps<'Details'>) => {
  return (
    <View style={styles.container}>
      <Text>Details screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Back to home</Text>
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

export default DetailsScreen
