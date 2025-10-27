import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from './types/root'
import ArrowLeft from '@/assets/icons/arrowLeft.png'

const DetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'Details'>) => {
  const { activity } = route.params
  return (
    <View className="relative flex-1 bg-white">
      <View className="relative">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
          }}
          className="w-full h-[450px] rounded-b-3xl"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
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
            <Text className="text-[24px] font-abelregular text-[#000000]">
              {activity.name}
            </Text>
          </View>

          <View className="flex-row justify-between items-center border-b border-[#F5F5F5] pb-3 mb-3">
            <Text className="text-[16px] font-abelregular text-[#000000]">
              ${activity.price.toFixed(2)}
            </Text>
            <Text className="font-sfregular text-[12px] text-[#979797]">
              Included taxes and fees
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-[16px] font-abelregular text-[#000] mb-1.5">
              Description
            </Text>
            <Text className="font-sfregular text-[14px] text-[#9D9D9D]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sed mauris varius, rutrum quam eu, rutrum justo.
              Quisque fermentum malesuada suscipit. Sed varius dictum ante vel
              mollis.
            </Text>
          </View>

          <View className="border-b border-[#F5F5F5] pb-3 mb-10"></View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.9}
        className=" absolute bottom-6 left-6 right-6 bg-black rounded-full py-5 mb-5"
      >
        <Text className="font-abelregular text-white text-center text-[16px]">
          Add to Favorites
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DetailsScreen
