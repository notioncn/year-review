'use client'

import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  VStack, 
  HStack, 
  Checkbox,
  Badge,
  Icon,
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  useColorModeValue,
  Divider,
  Button
} from '@chakra-ui/react'
import { FiPlus, FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  done: boolean
}

const tasks: Task[] = [
  { id: '1', title: '完成项目报告', category: '工作', priority: 'high', done: false },
  { id: '2', title: '阅读《原子习惯》第三章', category: '学习', priority: 'medium', done: false },
  { id: '3', title: '30分钟瑜伽练习', category: '健康', priority: 'medium', done: true },
  { id: '4', title: '安排周末家庭活动', category: '家庭', priority: 'low', done: false },
  { id: '5', title: '回复重要邮件', category: '工作', priority: 'high', done: false },
]

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'blue';
    default: return 'gray';
  }
}

const getPriorityText = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return '高';
    case 'medium': return '中';
    case 'low': return '低';
    default: return '';
  }
}

function TaskItem({ task }: { task: Task }) {
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const textDoneColor = useColorModeValue('gray.400', 'gray.500')

  return (
    <HStack spacing={4} py={2}>
      <Checkbox 
        colorScheme="brand" 
        isChecked={task.done} 
        size="lg"
      />
      <Box flex="1">
        <Text 
          fontWeight={task.done ? 'normal' : 'medium'} 
          color={task.done ? textDoneColor : textColor}
          textDecoration={task.done ? 'line-through' : 'none'}
        >
          {task.title}
        </Text>
        <Text fontSize="xs" color="gray.500">{task.category}</Text>
      </Box>
      <Badge colorScheme={getPriorityColor(task.priority)} fontSize="xs">
        {getPriorityText(task.priority)}
      </Badge>
    </HStack>
  )
}

export default function TasksWidget() {
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
      height="100%"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">任务</Heading>
        <HStack>
          <Button size="sm" leftIcon={<FiPlus />} colorScheme="brand" variant="ghost">
            添加
          </Button>
          <Link href="/time" passHref>
            <HStack spacing={1} color="brand.500" cursor="pointer">
              <Text fontSize="sm">全部任务</Text>
              <Icon as={FiChevronRight} boxSize={4} />
            </HStack>
          </Link>
        </HStack>
      </Flex>

      <Tabs colorScheme="brand" size="sm">
        <TabList>
          <Tab>今日</Tab>
          <Tab>明日</Tab>
          <Tab>本周</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel px={0}>
            <Text color="gray.500" py={4} textAlign="center">暂无明日任务</Text>
          </TabPanel>
          <TabPanel px={0}>
            <Text color="gray.500" py={4} textAlign="center">查看本周任务计划</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
} 