import { StackScreenProps } from '@react-navigation/stack'

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
