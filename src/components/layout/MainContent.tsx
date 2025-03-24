'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'

interface MainContentProps {
  children: React.ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box
      as="main"
      bg={bgColor}
      h="calc(100vh - 60px)"
      ml="64px"
      p={6}
      overflowY="auto"
    >
      {children}
    </Box>
  )
} 