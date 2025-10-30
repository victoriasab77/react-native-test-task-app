import { useQuery } from '@tanstack/react-query'
import { api } from '@services/api'
import type { Activity, ActivitiesQueryOptions } from '@types'

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
