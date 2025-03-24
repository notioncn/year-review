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
  Badge,
  Divider
} from '@chakra-ui/react'
import { FiBookOpen, FiFileText, FiVideo, FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

interface KnowledgeItem {
  id: string
  title: string
  type: 'book' | 'note' | 'course'
  updatedAt: string
}

const knowledgeItems: KnowledgeItem[] = [
  { id: '1', title: '《原子习惯》阅读笔记', type: 'book', updatedAt: '今天' },
  { id: '2', title: '知识管理系统构建', type: 'note', updatedAt: '昨天' },
  { id: '3', title: '时间管理精要课程', type: 'course', updatedAt: '2天前' },
]

const getTypeIcon = (type: KnowledgeItem['type']) => {
  switch (type) {
    case 'book': return FiBookOpen;
    case 'note': return FiFileText;
    case 'course': return FiVideo;
    default: return FiFileText;
  }
}

const getTypeText = (type: KnowledgeItem['type']) => {
  switch (type) {
    case 'book': return '书籍';
    case 'note': return '笔记';
    case 'course': return '课程';
    default: return '';
  }
}

const getTypeColor = (type: KnowledgeItem['type']) => {
  switch (type) {
    case 'book': return 'purple';
    case 'note': return 'blue';
    case 'course': return 'green';
    default: return 'gray';
  }
}

function KnowledgeListItem({ item }: { item: KnowledgeItem }) {
  return (
    <HStack spacing={4} py={2}>
      <Icon as={getTypeIcon(item.type)} boxSize={5} color={`${getTypeColor(item.type)}.500`} />
      <Box flex="1">
        <Text fontWeight="medium">{item.title}</Text>
        <HStack spacing={2} fontSize="xs" color="gray.500">
          <Badge colorScheme={getTypeColor(item.type)} size="sm">
            {getTypeText(item.type)}
          </Badge>
          <Text>更新于: {item.updatedAt}</Text>
        </HStack>
      </Box>
    </HStack>
  )
}

export default function KnowledgeWidget() {
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
        <Heading size="md">知识管理</Heading>
        <Link href="/knowledge" passHref>
          <HStack spacing={1} color="brand.500" cursor="pointer">
            <Text fontSize="sm">查看全部</Text>
            <Icon as={FiChevronRight} boxSize={4} />
          </HStack>
        </Link>
      </Flex>

      <VStack spacing={0} align="stretch" divider={<Divider />}>
        {knowledgeItems.map(item => (
          <KnowledgeListItem key={item.id} item={item} />
        ))}
      </VStack>
    </Box>
  )
} 