'use client'

import { Box, Heading } from '@chakra-ui/react'
import BackToHome from '@/components/layout/BackToHome'

export default function SettingsPage() {
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <Heading size="lg" mb={6}>个人设置</Heading>
        {/* 这里添加设置相关的内容 */}
      </Box>
    </Box>
  )
} 