import { View, Text, TouchableOpacity, Image } from 'react-native'

import type { Activity } from '@types'

import { RemoteImage } from '@components'

import { MapPinIcon, TagIcon, StarIcon } from '@assets/icons'

type Props = {
  activity: Activity
  isFavourite?: boolean
  onPress: () => void
}

export default function ActivityCard({
  activity,
  isFavourite,
  onPress,
}: Props) {
  const { name, location, price, rating, photoUrl } = activity
  const activityPrice = price.toFixed(2)
  const activityRating = rating?.toFixed(1)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 rounded-2xl overflow-hidden"
    >
      <View className="relative">
        <RemoteImage
          uri={photoUrl}
          className="h-[180px] w-full rounded-2xl overflow-hidden bg-[#ECECEC]"
        />

        {isFavourite && (
          <View className="absolute top-3 left-3">
            <Image source={TagIcon} className="w-[28px] h-[28px]" />
          </View>
        )}
      </View>

      <View className="bg-[#F7F7F7] rounded-2xl py-4 px-5 mt-1 gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-abelregular text-[16px] text-[#000000]">
            {name}
          </Text>
          <View className="flex-row items-center">
            <Image
              source={StarIcon}
              className="w-[16px] h-[16px] mr-1"
              resizeMode="contain"
            />
            <Text className="font-sfregular text-[12px] text-[#000000]">
              {activityRating}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={MapPinIcon}
              className="h-[13px] w-[10px] mr-[6px]"
              resizeMode="contain"
            />
            <Text className="font-sfregular text-[12px] text-[#000000]">
              {location}
            </Text>
          </View>

          <View className="flex-row ">
            <Text className="font-abelregular text-[14px] text-[#000000] ">
              ${activityPrice}
            </Text>
            <Text className="font-sfregular text-[12px] text-[#979797] ml-1">
              / night
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
