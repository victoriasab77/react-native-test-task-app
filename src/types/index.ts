import { type UseQueryOptions } from '@tanstack/react-query'

export type Activity = {
  id: number
  photoUrl: string
  name: string
  description: string
  location: string
  price: number
  rating: number
  isFavourite?: boolean
}

export type ActivitiesQueryOptions<TData> = Omit<
  UseQueryOptions<Activity[], Error, TData>,
  'queryKey' | 'queryFn'
>
