'use client'

import { 
  Box, 
  Flex, 
  IconButton, 
  Avatar, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue  
} from '@chakra-ui/react'
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function Header() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const currentDate = format(new Date(), 'yyyy年M月d日 EEEE', { locale: zhCN })

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      py={2}
      px={6}
      ml="64px"
    >
      <Flex align="center" justify="space-between" h="60px">
        <HStack spacing={6}>
          <Text fontSize="lg" color="gray.500">
            {currentDate}
          </Text>
        </HStack>

        <HStack spacing={4}>
          <InputGroup maxW="320px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="搜索..." variant="filled" />
          </InputGroup>

          <IconButton
            aria-label="通知"
            icon={<FiBell />}
            variant="ghost"
            borderRadius="full"
          />

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Avatar size="sm" name="用户" src="/avatar.png" />}
              variant="ghost"
              borderRadius="full"
            />
            <MenuList zIndex={2}>
              <MenuItem icon={<FiSettings />}>设置</MenuItem>
              <MenuItem>退出登录</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
} 