import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import type { RouteProp } from '@react-navigation/native'

import type { Activity } from '@types'

export enum RootStackRoute {
  HOME = 'Home',
  DETAILS = 'Details',
}

export type RootStackParamList = {
  [RootStackRoute.HOME]: undefined
  [RootStackRoute.DETAILS]: { activityId: Activity['id'] }
}

export type RootStackScreenProps<T extends RootStackRoute> = StackScreenProps<
  RootStackParamList,
  T
>

export type RootStackNavigationProp<T extends RootStackRoute> =
  StackNavigationProp<RootStackParamList, T>

export type RootStackRouteProp<T extends RootStackRoute> = RouteProp<
  RootStackParamList,
  T
>
