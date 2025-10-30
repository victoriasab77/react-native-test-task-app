import {
  ActivityIndicator,
  ImageLoadEventData,
  ImageURISource,
  Image,
  type ImageErrorEventData,
  type ImageProps,
  type NativeSyntheticEvent,
  StyleSheet,
  Platform,
} from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { PlaceholderImage } from '@assets/images'

interface RemoteImageProps extends Omit<ImageProps, 'source'> {
  uri?: string | null
  fallbackSource?: ImageURISource | number
}

/**
 * we display an ActivityIndicator while the image is loading (especially on Android).
 * onLoadStart → loading = true (spinner shows)
 * onLoadEnd or onError → loading = false (spinner hides)
 * We use fallbackSource when uri is missing or an error occurs.
 *
 * In this specific case we added the loader + fallback logic because one of the image URLs
 * is broken / never finishes loading, which causes the UI to hang without any feedback.
 * In a real-world scenario you would treat this as a backend/URL issue: validate the URL, fix the image on server side,
 * and avoid client-side hacks like multiple timers or complicated retry logic.
 *       – communicate with the backend (validate URL, check image availability, log slow loads),
 *       – possibly replace the image with an alternative or show an error state instead of indefinitely waiting.
 */

const RemoteImage = ({
  uri,
  fallbackSource = PlaceholderImage,
  onLoad,
  onError,
  ...rest
}: RemoteImageProps) => {
  const [shouldUseFallback, setShouldUseFallback] = useState(!uri)
  const [loading, setLoading] = useState(false)
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

  const handleLoadStart = () => {
    setLoading(true)
  }

  const handleLoadEnd = () => {
    setLoading(false)
  }

  return (
    <>
      <Image
        {...rest}
        source={source}
        defaultSource={fallbackSource}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {loading && Platform.OS === 'android' && (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFillObject} />
      )}
    </>
  )
}

export default RemoteImage
