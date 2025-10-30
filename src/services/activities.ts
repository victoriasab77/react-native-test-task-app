import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { Activity, ActivitiesQueryOptions } from '@types'

import { api } from './api'

export const useActivitiesQuery = <TData = Activity[]>(
  options?: ActivitiesQueryOptions<TData>,
) => {
  return useQuery<Activity[], Error, TData>({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await api.get('/activities')
      return res.data
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
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
