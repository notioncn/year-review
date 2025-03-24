'use client'

import { 
  Box, 
  VStack, 
  Icon, 
  Tooltip, 
  Text, 
  Flex,
  Divider,
  useColorModeValue
} from '@chakra-ui/react'
import { 
  FiHome, 
  FiTarget, 
  FiBook, 
  FiCalendar, 
  FiGrid, 
  FiDollarSign, 
  FiActivity,
  FiUser 
} from 'react-icons/fi'
import Link from 'next/link'

// 菜单项定义
const menuItems = [
  { icon: FiHome, label: '仪表盘', path: '/' },
  { icon: FiTarget, label: '生命之花', path: '/life-flower' },
  { icon: FiBook, label: '知识管理', path: '/knowledge' },
  { icon: FiCalendar, label: '时间管理', path: '/time' },
  { icon: FiGrid, label: '项目管理', path: '/projects' },
]

const bottomMenuItems = [
  { icon: FiDollarSign, label: '财务管理', path: '/finance' },
  { icon: FiActivity, label: '健康管理', path: '/health' },
  { icon: FiUser, label: '个人设置', path: '/settings' },
]

export default function Sidebar() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      w="64px"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      h="100vh"
      position="fixed"
      left="0"
      top="0"
      zIndex="1"
    >
      <Flex direction="column" h="full" justify="space-between" py={4}>
        <VStack spacing={6} align="center" w="full">
          <Box 
            w="40px" 
            h="40px" 
            borderRadius="md" 
            bg="brand.500" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">L</Text>
          </Box>
          
          <VStack spacing={5} pt={4}>
            {menuItems.map((item, index) => (
              <Link href={item.path} key={index} passHref>
                <Tooltip label={item.label} placement="right" hasArrow>
                  <Box cursor="pointer" _hover={{ color: 'brand.500' }}>
                    <Icon as={item.icon} w={6} h={6} />
                  </Box>
                </Tooltip>
              </Link>
            ))}
          </VStack>
        </VStack>

        <VStack spacing={5}>
          <Divider />
          {bottomMenuItems.map((item, index) => (
            <Link href={item.path} key={index} passHref>
              <Tooltip label={item.label} placement="right" hasArrow>
                <Box cursor="pointer" _hover={{ color: 'brand.500' }}>
                  <Icon as={item.icon} w={6} h={6} />
                </Box>
              </Tooltip>
            </Link>
          ))}
        </VStack>
      </Flex>
    </Box>
  )
} 