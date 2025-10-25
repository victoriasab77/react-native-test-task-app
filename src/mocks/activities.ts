export type Activity = {
  id: number
  photoUrl: string
  name: string
  description: string
  location: string
  price: number
  rating: number
}

export const activitiesMock: Activity[] = [
  {
    id: 1,
    photoUrl:
      'https://thewanderlustrose.com/wp-content/uploads/2020/04/Screenshot-2020-04-07-at-7.44.25-.png',
    name: 'Hiking',
    description: 'A beautiful hiking experience',
    location: 'Mountain',
    price: 50,
    rating: 4.5,
  },
  {
    id: 2,
    photoUrl:
      'https://thewanderlustrose.com/wp-content/uploads/2020/04/Screenshot-2020-04-07-at-7.44.25-.png',
    name: 'City Tour',
    description: 'Explore the old town with a local guide',
    location: 'Downtown',
    price: 35,
    rating: 4.3,
  },
  {
    id: 3,
    photoUrl:
      'https://thewanderlustrose.com/wp-content/uploads/2020/04/Screenshot-2020-04-07-at-7.44.25-.png',
    name: 'Kayaking',
    description: 'Guided kayaking trip on the river',
    location: 'Lakeside',
    price: 60,
    rating: 4.8,
  },
]

export type FavoriteRequest = {
  id: number
}

export type FavoriteSuccessResponse = {
  message: string
}

export type FavoriteErrorResponse = {
  error: string
}

export const addFavoriteSuccessMock = (
  id: number,
): FavoriteSuccessResponse => ({
  message: `Activity with id ${id} has been added to favorites`,
})

export const addFavoriteErrorMock: FavoriteErrorResponse = {
  error: 'Activity id is required',
}
