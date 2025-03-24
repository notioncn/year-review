'use client'

import { 
  Grid, 
  GridItem, 
  Heading, 
  Box, 
  Text, 
  VStack,
  SimpleGrid
} from '@chakra-ui/react'
import DailyOverview from './DailyOverview'
import TasksWidget from './TasksWidget'
import KnowledgeWidget from './KnowledgeWidget'
import LifeFlowerWidget from './LifeFlowerWidget'
import QuickActions from './QuickActions'

export default function Dashboard() {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="lg" mb={1}>仪表盘</Heading>
        <Text color="gray.500">欢迎回来，今天是美好的一天</Text>
      </Box>

      <DailyOverview />
      
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem colSpan={{ base: 6, md: 4 }}>
          <TasksWidget />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 2 }}>
          <QuickActions />
        </GridItem>
      </Grid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <LifeFlowerWidget />
        <KnowledgeWidget />
      </SimpleGrid>
    </VStack>
  )
} 