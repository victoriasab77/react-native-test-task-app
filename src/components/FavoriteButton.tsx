import { Animated, Easing, Image, Text, TouchableOpacity } from 'react-native'
import { useEffect, useMemo, useRef } from 'react'
import Tag from '@/assets/icons/tag.webp'

type FavoriteButtonProps = {
  isFavourite: boolean
  isPending: boolean
  onPress: () => void
}

const FavoriteButton = ({
  isFavourite,
  isPending,
  onPress,
}: FavoriteButtonProps) => {
  const fadeAnim = useRef(new Animated.Value(isFavourite ? 0 : 1)).current
  const fadeText = useRef(new Animated.Value(isFavourite ? 1 : 0)).current
  const previousIsFavourite = useRef<boolean>(isFavourite)

  useEffect(() => {
    if (previousIsFavourite.current === isFavourite) {
      return
    }

    if (isFavourite) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(fadeText, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start()
    } else {
      fadeAnim.setValue(1)
      fadeText.setValue(0)
    }

    previousIsFavourite.current = isFavourite
  }, [fadeAnim, fadeText, isFavourite])

  const isDisabled = useMemo(
    () => isPending || isFavourite,
    [isPending, isFavourite],
  )

  return (
    <>
      <Animated.View
        style={{ opacity: fadeAnim }}
        className={'absolute bottom-6 left-6 right-6'}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          className={`bg-black rounded-full py-5 ${
            isDisabled ? 'opacity-65' : ''
          }`}
          onPress={onPress}
          disabled={isDisabled}
        >
          <Text className="font-abelregular text-white text-center text-[16px]">
            Add to Favorites
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {isFavourite && (
        <Animated.View
          style={{ opacity: fadeText }}
          className={
            'absolute bottom-10 left-0 right-0 items-center flex-row justify-center'
          }
        >
          <Text className="text-[#000] font-abelregular text-[16px]">
            Added to Favorites
          </Text>
          <Image source={Tag} className="w-[28px] h-[28px] ml-2" />
        </Animated.View>
      )}
    </>
  )
}

export default FavoriteButton
