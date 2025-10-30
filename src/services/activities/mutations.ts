import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@services/api'
import type { Activity } from '@types'

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post('/favorites', { id })
      return res.data
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Activity[]>(['activities'], prev =>
        prev
          ? prev.map(a => (a.id === id ? { ...a, isFavourite: true } : a))
          : prev,
      )
    },
  })
}
