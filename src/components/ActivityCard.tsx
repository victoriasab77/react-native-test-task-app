import { View, Text, TouchableOpacity, Image } from 'react-native'

import type { Activity } from '@types'

import { RemoteImage } from '@components'

import { MapPinIcon, TagIcon, StarIcon } from '@assets/icons'
import { texts } from '@texts'

interface ActivityCardProps {
  activity: Activity
  isFavourite?: boolean
  onPress: () => void
}

export default function ActivityCard({
  activity,
  isFavourite,
  onPress,
}: ActivityCardProps) {
  const { name, location, price, rating, photoUrl } = activity
  const activityPrice = price.toFixed(2)
  const activityRating = rating?.toFixed(1)

  const { night } = texts.activityCard

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 rounded-2xl overflow-hidden"
    >
      <View className="relative rounded-2xl overflow-hidden">
        <RemoteImage
          uri={photoUrl}
          className="h-[180px] w-full bg-surface-muted"
        />

        {isFavourite && (
          <View className="absolute top-3 left-3">
            <Image source={TagIcon} className="w-[28px] h-[28px]" />
          </View>
        )}
      </View>

      <View className="bg-surface rounded-2xl py-4 px-5 mt-1 gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-abelregular text-body text-primary">
            {name}
          </Text>
          <View className="flex-row items-center">
            <Image
              source={StarIcon}
              className="w-[16px] h-[16px] mr-1"
              resizeMode="contain"
            />
            <Text className="font-sfregular text-caption text-primary">
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
            <Text className="font-sfregular text-caption text-primary">
              {location}
            </Text>
          </View>

          <View className="flex-row ">
            <Text className="font-abelregular text-label text-primary ">
              ${activityPrice}
            </Text>
            <Text className="font-sfregular text-caption text-secondary ml-1">
              {night}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
