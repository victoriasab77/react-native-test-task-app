import {
  ImageLoadEventData,
  ImageURISource,
  Image as RNImage,
  type ImageErrorEventData,
  type ImageProps,
  type NativeSyntheticEvent,
} from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import PlaceholderImage from '@/assets/images/placeholder.png'

type Props = Omit<ImageProps, 'source'> & {
  uri?: string | null
  fallbackSource?: ImageURISource | number
}

const RemoteImage = ({
  uri,
  fallbackSource = PlaceholderImage,
  onLoad,
  onError,
  ...rest
}: Props) => {
  const [shouldUseFallback, setShouldUseFallback] = useState(!uri)
  const previousUriRef = useRef<string | null | undefined>(uri)

  useEffect(() => {
    if (previousUriRef.current !== uri) {
      previousUriRef.current = uri
      setShouldUseFallback(!uri)
    }
  }, [uri])

  const source = useMemo(() => {
    if (!uri || shouldUseFallback) {
      return fallbackSource
    }

    return { uri }
  }, [fallbackSource, shouldUseFallback, uri])

  const handleLoad = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      if (uri) {
        setShouldUseFallback(false)
      }
      onLoad?.(event)
    },
    [onLoad, uri],
  )

  const handleError = useCallback(
    (event: NativeSyntheticEvent<ImageErrorEventData>) => {
      setShouldUseFallback(true)
      onError?.(event)
    },
    [onError],
  )

  return (
    <RNImage
      {...rest}
      source={source}
      defaultSource={fallbackSource}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

export default RemoteImage
