import {
  TouchableOpacity,
  type TouchableOpacityProps,
  Image,
} from 'react-native'
import type { ReactElement } from 'react'

import { ArrowLeftIcon } from '@assets/icons'

type IconButtonProps = TouchableOpacityProps & {
  icon?: ReactElement
  size?: 'sm' | 'md' | 'lg'
}

const paddings = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const

const IconButton = ({
  icon,
  size = 'md',
  className,
  ...touchableProps
}: IconButtonProps) => {
  const paddingClass = paddings[size]

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`rounded-full bg-surface ${paddingClass} ${
        className ?? ''
      }`.trim()}
      {...touchableProps}
    >
      {icon ?? <Image source={ArrowLeftIcon} className="w-5 h-5" />}
    </TouchableOpacity>
  )
}

export default IconButton
