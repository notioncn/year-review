'use client'

import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  VStack, 
  HStack, 
  Icon,
  useColorModeValue,
  Button
} from '@chakra-ui/react'
import { 
  FiPlus, 
  FiEdit3, 
  FiBarChart2, 
  FiCalendar, 
  FiBookmark, 
  FiActivity 
} from 'react-icons/fi'

interface ActionButton {
  icon: React.ElementType;
  label: string;
  color: string;
  action: () => void;
}

export default function QuickActions() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const quickActions: ActionButton[] = [
    {
      icon: FiPlus,
      label: '新建任务',
      color: 'blue.500',
      action: () => console.log('创建任务')
    },
    {
      icon: FiEdit3,
      label: '记录笔记',
      color: 'purple.500',
      action: () => console.log('记录笔记')
    },
    {
      icon: FiBarChart2,
      label: '复盘总结',
      color: 'orange.500',
      action: () => console.log('复盘总结')
    },
    {
      icon: FiCalendar,
      label: '安排计划',
      color: 'green.500',
      action: () => console.log('安排计划')
    },
    {
      icon: FiBookmark,
      label: '添加收藏',
      color: 'red.500',
      action: () => console.log('添加收藏')
    },
    {
      icon: FiActivity,
      label: '记录健康',
      color: 'cyan.500',
      action: () => console.log('记录健康')
    }
  ]

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
        <Heading size="md">快速操作</Heading>
      </Flex>

      <VStack spacing={3} align="stretch">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            leftIcon={<Icon as={action.icon} color={action.color} />}
            justifyContent="flex-start"
            variant="ghost"
            size="md"
            width="100%"
            onClick={action.action}
            borderRadius="md"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          >
            <Text color="gray.700">{action.label}</Text>
          </Button>
        ))}
      </VStack>
    </Box>
  )
} 