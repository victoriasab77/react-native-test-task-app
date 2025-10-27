import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import type { Activity } from '@/mocks/activities'
import MapPin from '@/assets/icons/MapPin.png'
import Tag from '@/assets/icons/tag.png'
import Star from '@/assets/icons/star.png'

type Props = {
  activity: Activity
  onPress: () => void
  isFavourite: boolean
}

export default function ActivityCard({ activity, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4 rounded-2xl overflow-hidden"
    >
      <View className="relative">
        <ImageBackground
          source={{ uri: activity.photoUrl }}
          className="h-[180px] w-full rounded-2xl overflow-hidden"
        />

        <View className="absolute top-3 left-3 ">
          <Image source={Tag} className="w-[28px] h-[28px]" />
        </View>
      </View>

      <View className="bg-[#F7F7F7] rounded-2xl py-4 px-5 mt-1 gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-abelregular text-[16px] text-[#000000]">
            {activity.name}
          </Text>
          <View className="flex-row items-center">
            <Image
              source={Star}
              className="w-[16px] h-[16px] mr-1"
              resizeMode="contain"
            />
            <Text className="font-sfregular text-[12px] text-[#000000]">
              {activity.rating?.toFixed(1)}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={MapPin}
              className="h-[13px] w-[10px] mr-[6px]"
              resizeMode="contain"
            />
            <Text className="font-sfregular text-[12px] text-[#000000]">
              {activity.location}
            </Text>
          </View>

          <View className="flex-row ">
            <Text className="font-abelregular text-[14px] text-[#000000] ">
              ${activity.price.toFixed(2)}
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
