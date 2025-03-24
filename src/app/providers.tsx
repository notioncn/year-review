'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// 自定义主题
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#bae7ff',
      500: '#1890ff',
      600: '#096dd9',
      700: '#0050b3',
    },
    lifeflower: {
      self: '#ff85c0',      // 自我实现 - 粉色
      career: '#52c41a',    // 职业发展 - 绿色
      health: '#40a9ff',    // 身心健康 - 蓝色
      relation: '#722ed1',  // 关系网络 - 紫色
    }
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
} 