import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import type { Activity } from '@/mocks/activities'
import MapPin from '@/assets/icons/MapPin.png'

type Props = {
  activity: Activity
  onPress: () => void
}

export default function ActivityCard({ activity, onPress }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="mb-4">
      <ImageBackground
        source={{ uri: activity.photoUrl }}
        className="h-[180px] w-full mb-0.5 rounded-2xl overflow-hidden"
        imageStyle={{ borderRadius: 20 }}
      />

      <View className="bg-[#F7F7F7] rounded-2xl py-4 px-5 mb-2.5 gap-2">
        <Text className="text-base font-semibold">{activity.name}</Text>

        <View className="flex-row items-start">
          <Image
            source={MapPin}
            className="h-[13px] w-[10px] mt-[2px] mr-[6px]"
            resizeMode="contain"
          />
          <Text className="text-[14px]">{activity.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
