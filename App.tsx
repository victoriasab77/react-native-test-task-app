import './global.css'

import RootRouter from '@screens/RootRouter'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="transparent" translucent />
        <GestureHandlerRootView>
          <NavigationContainer>
            <RootRouter />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
