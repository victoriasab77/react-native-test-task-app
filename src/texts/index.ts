/**
 * centralised text definitions. Acts as a mock localisation layer so that all copy
 * can be updated in a single place. Replace with a proper i18n solution when needed.
 */

export const texts = {
  home: {
    title: 'Activities',
    empty: 'No activities available right now.',
    loading: 'Loading activities…',
    error: 'Failed to load activities',
  },
  details: {
    loading: 'Loading activity…',
    error: 'Unable to load the activity details right now.',
    goBack: 'Go back',
    priceSuffix: 'Included taxes and fees',
    description: 'Description',
    locationPrefix: 'Location:',
    addToFavorites: 'Add to Favorites',
    addedToFavorites: 'Added to Favorites',
  },
  favorites: {
    adding: 'Adding…',
  },
}

export type TextKey = typeof texts
