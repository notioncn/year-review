'use client'

import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '@/components/layout/Sidebar'
import MainContent from '@/components/layout/MainContent'
import Header from '@/components/layout/Header'
import Dashboard from '@/components/dashboard/Dashboard'

export default function Home() {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" overflow="hidden">
        <Header />
        <MainContent>
          <Dashboard />
        </MainContent>
      </Box>
    </Flex>
  )
} 