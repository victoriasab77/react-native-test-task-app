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
    // cache configuration tuned for static content.
    // we keep activities fresh for 5 minutes (staleTime)
    // and retain them in memory for up to 30 minutes (gcTime).
    // auto-refetching on focus, reconnect, and intervals are disabled
    // since the data set is small, rarely changes, and does not require real-time sync.
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
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
