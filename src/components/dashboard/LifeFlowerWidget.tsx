'use client'

import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Progress, 
  VStack, 
  HStack, 
  Badge,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

interface LifeAreaProps {
  title: string
  score: number
  color: string
  tasks: number
}

const lifeAreas: LifeAreaProps[] = [
  { title: '自我实现', score: 75, color: 'lifeflower.self', tasks: 3 },
  { title: '职业发展', score: 85, color: 'lifeflower.career', tasks: 2 },
  { title: '身心健康', score: 60, color: 'lifeflower.health', tasks: 4 },
  { title: '关系网络', score: 70, color: 'lifeflower.relation', tasks: 1 },
]

function LifeArea({ title, score, color, tasks }: LifeAreaProps) {
  return (
    <Box>
      <Flex justify="space-between" mb={1}>
        <Text fontWeight="medium">{title}</Text>
        <HStack>
          <Badge colorScheme={color.split('.')[1]}>{tasks}项</Badge>
          <Text>{score}%</Text>
        </HStack>
      </Flex>
      <Progress value={score} size="sm" colorScheme={color.split('.')[1]} borderRadius="full" />
    </Box>
  )
}

export default function LifeFlowerWidget() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box 
      p={6} 
      borderRadius="lg" 
      bg={bgColor} 
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">生命之花</Heading>
        <Link href="/life-flower" passHref>
          <HStack spacing={1} color="brand.500" cursor="pointer">
            <Text fontSize="sm">查看详情</Text>
            <Icon as={FiChevronRight} boxSize={4} />
          </HStack>
        </Link>
      </Flex>

      <VStack spacing={4} align="stretch">
        {lifeAreas.map((area, index) => (
          <LifeArea key={index} {...area} />
        ))}
      </VStack>
    </Box>
  )
} 