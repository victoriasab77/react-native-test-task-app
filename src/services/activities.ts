import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { api } from './api'

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

type ActivitiesQueryOptions<TData> = Omit<
  UseQueryOptions<Activity[], Error, TData>,
  'queryKey' | 'queryFn'
>

export const useActivitiesQuery = <TData = Activity[]>(
  options?: ActivitiesQueryOptions<TData>,
) => {
  return useQuery<Activity[], Error, TData>({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await api.get('/activities')
      return res.data
    },
    staleTime: 1000 * 60,
    ...options,
  })
}

export const useCachedActivity = (id: number) =>
  useActivitiesQuery<Activity | undefined>({
    select: activities => activities.find(a => a.id === id),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post('/favorites', { id })
      return res.data
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Activity[]>(['activities'], prev => {
        if (!prev) {
          return prev
        }
        return prev.map(activity =>
          activity.id === id ? { ...activity, isFavourite: true } : activity,
        )
      })
    },
  })
}
