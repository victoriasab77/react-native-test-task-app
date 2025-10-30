import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useCachedActivity, useAddFavoriteMutation } from '@services/activities'
import {
  RootStackRoute,
  RootStackNavigationProp,
  RootStackRouteProp,
} from './types/root'

import {
  LoadingState,
  ErrorState,
  RemoteImage,
  FavoriteButton,
} from '@components'
import { texts } from '@texts'

const DetailsScreen = () => {
  const navigation =
    useNavigation<RootStackNavigationProp<RootStackRoute.DETAILS>>()
  const route = useRoute<RootStackRouteProp<RootStackRoute.DETAILS>>()
  const { activityId } = route.params

  const {
    data: activity,
    isPending,
    isFetching,
  } = useCachedActivity(activityId)

  const addFavoriteMutation = useAddFavoriteMutation()

  const { loading, errorMessage, back, priceSuffix, locationPrefix } =
    texts.details

  const goBack = () => navigation.goBack()
  const isLoading = isPending || isFetching

  const handleAddToFavourites = () => {
    addFavoriteMutation.mutate(activityId)
  }

  if (isLoading) {
    return (
      <LoadingState
        message={loading}
        className="flex-1 items-center justify-center bg-white px-6"
      />
    )
  }

  if (!activity) {
    return (
      <ErrorState
        message={errorMessage}
        className="flex-1 items-center justify-center bg-white px-6"
      >
        <TouchableOpacity
          onPress={goBack}
          className="mt-4 bg-black rounded-full px-6 py-3"
          activeOpacity={0.8}
        >
          <Text className="font-abelregular text-white text-[14px]">
            {back}
          </Text>
        </TouchableOpacity>
      </ErrorState>
    )
  }

  const { photoUrl, name, price, description, location, isFavourite } = activity
  const formattedPrice = price.toFixed(2)

  return (
    <View className="relative flex-1 bg-white">
      <View className="relative">
        <RemoteImage
          uri={photoUrl}
          className="w-full h-[450px] rounded-b-3xl bg-surface-muted"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        <View className="px-6 pt-8">
          <View className="flex-row justify-between mb-3">
            <Text className="font-abelregular text-heading text-primary">
              {name}
            </Text>
          </View>

          <View className="flex-row justify-between items-center border-b border-border pb-3 mb-3">
            <Text className="font-abelregular text-body text-primary">
              ${formattedPrice}
            </Text>
            <Text className="font-sfregular text-caption text-secondary">
              {priceSuffix}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="font-abelregular text-body text-primary mb-1.5">
              {texts.details.description}
            </Text>
            <Text className="font-sfregular text-label text-muted">
              {description}
            </Text>
          </View>

          <View className="border-b border-border pb-3 mb-10">
            <Text className="font-sfregular text-label text-muted">
              {locationPrefix} {location}
            </Text>
          </View>
        </View>
      </ScrollView>

      <FavoriteButton
        isFavourite={!!isFavourite}
        onPress={handleAddToFavourites}
        isPending={addFavoriteMutation.isPending}
      />
    </View>
  )
}

export default DetailsScreen
