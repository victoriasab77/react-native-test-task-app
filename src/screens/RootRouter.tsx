import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack'

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'

import { RootStackParamList, RootStackRoute } from './types/root'

const Stack = createStackNavigator<RootStackParamList>()

const RootRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName={RootStackRoute.HOME}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        gestureEnabled: true,
        detachPreviousScreen: !navigation.isFocused(),
        ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Stack.Screen
        name={RootStackRoute.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RootStackRoute.DETAILS}
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootRouter
