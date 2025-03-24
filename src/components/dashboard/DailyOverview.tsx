'use client'

import { 
  Box, 
  Flex, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Progress,
  SimpleGrid,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FiTarget, FiClock, FiBattery, FiBrain } from 'react-icons/fi'

interface MetricCardProps {
  label: string
  value: string
  helpText?: string
  icon: React.ElementType
  progress: number
  color: string
}

function MetricCard({ label, value, helpText, icon, progress, color }: MetricCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box 
      p={4} 
      borderRadius="lg" 
      bg={bgColor} 
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" mb={2}>
        <Icon as={icon} boxSize={6} color={color} />
        <Text fontSize="sm" color="gray.500">{progress}%</Text>
      </Flex>
      <Stat>
        <StatLabel color="gray.500">{label}</StatLabel>
        <StatNumber fontSize="2xl">{value}</StatNumber>
        {helpText && <StatHelpText>{helpText}</StatHelpText>}
      </Stat>
      <Progress 
        value={progress} 
        size="sm" 
        colorScheme={color.replace('.500', '')} 
        borderRadius="full" 
        mt={2}
      />
    </Box>
  )
}

export default function DailyOverview() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
        <MetricCard
          label="今日任务"
          value="5/8"
          helpText="任务完成率"
          icon={FiTarget}
          progress={62.5}
          color="blue.500"
        />
        <MetricCard
          label="学习时间"
          value="2.5小时"
          helpText="剩余计划：1.5小时"
          icon={FiClock}
          progress={75}
          color="green.500"
        />
        <MetricCard
          label="精力指数"
          value="85%"
          helpText="状态良好"
          icon={FiBattery}
          progress={85}
          color="purple.500"
        />
        <MetricCard
          label="专注时间"
          value="4小时"
          helpText="高于平均水平"
          icon={FiBrain}
          progress={80}
          color="orange.500"
        />
      </SimpleGrid>
    </Box>
  )
} 