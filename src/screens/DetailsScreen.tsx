import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import ArrowLeft from '@/assets/icons/arrowLeft.png'
import {
  useCachedActivity,
  useAddFavoriteMutation,
} from '@/services/activities'
import { RootStackScreenProps } from './types/root'
import LoadingState from '@/components/LoadingState'
import ErrorState from '@/components/ErrorState'
import RemoteImage from '@/components/RemoteImage'
import FavoriteButton from '@/components/FavoriteButton'

const DetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'Details'>) => {
  const { activityId } = route.params

  const {
    data: activity,
    isPending,
    isFetching,
  } = useCachedActivity(activityId)

  const addFavoriteMutation = useAddFavoriteMutation()
  const goBack = () => navigation.goBack()
  const isLoading = isPending || isFetching

  const handleAddToFavourites = () => {
    addFavoriteMutation.mutate(activityId)
  }

  if (isLoading) {
    return (
      <LoadingState
        message="Loading activity…"
        className="flex-1 items-center justify-center bg-white px-6"
      />
    )
  }

  if (!activity) {
    return (
      <ErrorState
        message="Unable to load the activity details right now."
        className="flex-1 items-center justify-center bg-white px-6"
      >
        <TouchableOpacity
          onPress={goBack}
          className="mt-4 bg-black rounded-full px-6 py-3"
          activeOpacity={0.8}
        >
          <Text className="font-abelregular text-white text-[14px]">
            Go back
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
          className="w-full h-[450px] rounded-b-3xl"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          className="absolute top-14 left-4 bg-[#F7F7F7] rounded-full p-6"
        >
          <Image source={ArrowLeft} className="w-5 h-5" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        <View className="px-6 pt-8">
          <View className="flex-row justify-between mb-3">
            <Text className="text-[24px] font-abelregular text-black">
              {name}
            </Text>
          </View>

          <View className="flex-row justify-between items-center border-b border-[#F5F5F5] pb-3 mb-3">
            <Text className="text-[16px] font-abelregular text-black">
              ${formattedPrice}
            </Text>
            <Text className="font-sfregular text-[12px] text-[#979797]">
              Included taxes and fees
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-[16px] font-abelregular text-black mb-1.5">
              Description
            </Text>
            <Text className="font-sfregular text-[14px] text-[#9D9D9D]">
              {description}
            </Text>
          </View>

          <View className="border-b border-[#F5F5F5] pb-3 mb-10">
            <Text className="font-sfregular text-[14px] text-[#9D9D9D]">
              Location: {location}
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
