'use client'

import { Box, Heading } from '@chakra-ui/react'
import BackToHome from '@/components/layout/BackToHome'

export default function HealthPage() {
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <Heading size="lg" mb={6}>健康管理</Heading>
        {/* 这里添加健康管理相关的内容 */}
      </Box>
    </Box>
  )
} 