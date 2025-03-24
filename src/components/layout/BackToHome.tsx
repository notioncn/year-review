'use client'

import { IconButton, Tooltip } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'

interface BackToHomeProps {
  position?: 'top-left' | 'top-right'
}

export default function BackToHome({ position = 'top-left' }: BackToHomeProps) {
  const router = useRouter()
  
  const getPositionStyles = () => {
    if (position === 'top-left') {
      return { top: 4, left: 4 }
    }
    return { top: 4, right: 4 }
  }

  return (
    <Tooltip label="返回主页" placement="right">
      <IconButton
        aria-label="返回主页"
        icon={<ArrowBackIcon />}
        position="absolute"
        {...getPositionStyles()}
        zIndex={2}
        size="md"
        colorScheme="teal"
        variant="ghost"
        onClick={() => router.push('/')}
      />
    </Tooltip>
  )
} 