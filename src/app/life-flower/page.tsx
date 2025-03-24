'use client'

import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  SimpleGrid, 
  Card, 
  CardBody,
  Textarea, 
  Button, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Image,
  Flex,
  useColorModeValue,
  Divider,
  useToast
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FiDownload } from 'react-icons/fi'
import html2canvas from 'html2canvas'
import BackToHome from '@/components/layout/BackToHome'

// 定义维度类型
interface Dimension {
  id: string;
  name: string;
  color: string;
  position: string;
}

// 定义计划类型
interface Plans {
  [key: string]: string[];
}

// 生命之花的8个维度
const dimensions: Dimension[] = [
  { id: 'career', name: '职业发展', color: '#c9e4de', position: 'top' },
  { id: 'finance', name: '财务状况', color: '#c9e4de', position: 'top-right' },
  { id: 'health', name: '健康', color: '#f9ebc8', position: 'right' },
  { id: 'leisure', name: '娱乐休闲', color: '#f9ebc8', position: 'bottom-right' },
  { id: 'family', name: '家庭', color: '#fbe4d8', position: 'bottom' },
  { id: 'social', name: '朋友与重要他人', color: '#fbe4d8', position: 'bottom-left' },
  { id: 'growth', name: '个人成长', color: '#e2cfc4', position: 'left' },
  { id: 'selfRealization', name: '自我实现', color: '#e2cfc4', position: 'top-left' }
]

export default function LifeFlowerPage() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const flowersRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  
  // 每个维度存储最多3个计划项
  const [plans, setPlans] = useState<Plans>(
    dimensions.reduce((acc: Plans, dim) => {
      acc[dim.id] = ['', '', '']
      return acc
    }, {})
  )
  const [activeTab, setActiveTab] = useState(0)

  // 处理计划变化
  const handlePlanChange = (dimensionId: string, index: number, value: string) => {
    setPlans(prev => ({
      ...prev,
      [dimensionId]: prev[dimensionId].map((item: string, i: number) => i === index ? value : item)
    }))
  }
  
  // 导出图表为图片
  const exportChart = async () => {
    if (flowersRef.current) {
      try {
        const canvas = await html2canvas(flowersRef.current, {
          backgroundColor: bgColor,
          scale: 2, // 提高导出图片质量
        })
        
        const image = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = image
        link.download = '我的生命之花.png'
        link.click()
        
        toast({
          title: '导出成功',
          description: '生命之花图表已保存为图片',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: '导出失败',
          description: '请稍后重试',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.error('导出错误:', error)
      }
    }
  }
  
  // 切换到第二个标签页
  const goToFlowerTab = () => {
    if (tabsRef.current) {
      setActiveTab(1)
    }
  }

  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <Tabs 
          variant="soft-rounded" 
          colorScheme="teal" 
          index={activeTab}
          onChange={(index) => setActiveTab(index)}
          ref={tabsRef}
        >
          <TabList mb={4}>
            <Tab>介绍</Tab>
            <Tab>我的生命之花</Tab>
          </TabList>

          <TabPanels>
            {/* 介绍面板 */}
            <TabPanel>
              <VStack spacing={5} align="start">
                <Heading size="lg">生命之花 - 平衡轮</Heading>
                <Text>
                  生命之花，又叫作平衡轮，是一个生涯教练工具。
                  这个工具可以帮助你：
                </Text>
                <VStack align="start" pl={5}>
                  <Text>1. 看到生活的全貌</Text>
                  <Text>2. 发现自己真正想做的事情</Text>
                  <Text>3. 开始排入日程</Text>
                  <Text>4. 让各方面互相平衡、支持、启发，全部都能实现</Text>
                </VStack>
                
                <Text mt={2}>
                  生命之花有8个维度，代表生活的8个重要方面：
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  {dimensions.map(dim => (
                    <HStack key={dim.id} p={3} bg={dim.color} borderRadius="md">
                      <Text fontWeight="bold">{dim.name}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
                
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>生命之花有何玄机？</Text>
                  <Text>
                    上半边主要是向外的，目标型的。下半部分更多是向内的，关系型的。
                    有人的生命之花上半截很好，下半截不行，头重脚轻，这种迟早会失衡。
                    而脚重头轻的人，则容易长成土豆，过于保守和安逸。
                  </Text>
                  <Text mt={2}>
                    每个象限也有自己的侧重：分为职业发展、个人幸福、他人关系、自我实现四个大类。
                    一个人如果能够在一个月之内，为自己的职业、幸福、关系和梦想都做点事情，这个月怎么会不好呢？
                  </Text>
                  <Text mt={2} fontWeight="bold">
                    话说——开满鲜花的花园，不会长草！
                  </Text>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>如何填写？</Text>
                  <VStack align="start" spacing={2}>
                    <Text>1. 每个维度最好填写3项，不要超过5项！如果一定要，删除掉那些不做不会死的！</Text>
                    <Text>2. 你觉得重要一点的，可以特别标注或优先考虑。</Text>
                    <Text>3. 一开始想不出来，宁愿空着也不要随便填写！一定要填写让自己怦然心动的东西。</Text>
                    <Text>4. 尽量使用视觉化的内容，图画比文字有驱动力。</Text>
                  </VStack>
                </Box>
                
                <Button colorScheme="teal" mt={4} onClick={goToFlowerTab}>
                  开始创建我的生命之花
                </Button>
              </VStack>
            </TabPanel>
            
            {/* 生命之花面板 */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {/* 左侧: 生命之花图表 */}
                <Box>
                  <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Heading size="md">我的生命之花图表</Heading>
                    <Button 
                      leftIcon={<FiDownload />} 
                      colorScheme="teal" 
                      size="sm"
                      onClick={exportChart}
                    >
                      导出图表
                    </Button>
                  </Flex>
                  
                  <Box 
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={4}
                    bg={bgColor}
                  >
                    <Flex 
                      ref={flowersRef}
                      justifyContent="center" 
                      alignItems="center"
                      borderRadius="full"
                      p={2}
                      position="relative"
                      h="400px"
                      w="400px"
                      bg={bgColor}
                    >
                      {/* 花的背景 - 十字线和对角线 */}
                      <Box position="absolute" w="100%" h="1px" bg="gray.300" />
                      <Box position="absolute" h="100%" w="1px" bg="gray.300" />
                      <Box position="absolute" w="140%" h="1px" bg="gray.300" transform="rotate(45deg)" />
                      <Box position="absolute" w="140%" h="1px" bg="gray.300" transform="rotate(-45deg)" />
                      
                      {/* 中心标题 */}
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex="1"
                        bg={bgColor}
                        borderRadius="full"
                        p={2}
                        w="80px"
                        h="80px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text fontSize="xs" fontWeight="bold" textAlign="center">
                          我的生命之花
                        </Text>
                      </Box>
                      
                      {/* 8个花瓣的标签 */}
                      {dimensions.map((dim) => {
                        // 根据位置设置标签位置
                        let positionStyles = {}
                        switch(dim.position) {
                          case 'top':
                            positionStyles = { top: '10px', left: '50%', transform: 'translateX(-50%)' }
                            break
                          case 'top-right':
                            positionStyles = { top: '20%', right: '10px' }
                            break
                          case 'right':
                            positionStyles = { top: '50%', right: '10px', transform: 'translateY(-50%)' }
                            break
                          case 'bottom-right':
                            positionStyles = { bottom: '20%', right: '10px' }
                            break
                          case 'bottom':
                            positionStyles = { bottom: '10px', left: '50%', transform: 'translateX(-50%)' }
                            break
                          case 'bottom-left':
                            positionStyles = { bottom: '20%', left: '10px' }
                            break
                          case 'left':
                            positionStyles = { top: '50%', left: '10px', transform: 'translateY(-50%)' }
                            break
                          case 'top-left':
                            positionStyles = { top: '20%', left: '10px' }
                            break
                        }
                        
                        return (
                          <Text
                            key={dim.id}
                            position="absolute"
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.700"
                            {...positionStyles}
                          >
                            {dim.name}
                          </Text>
                        )
                      })}
                      
                      {/* 计划项显示在花瓣内 */}
                      {dimensions.map((dim) => {
                        const nonEmptyPlans = plans[dim.id].filter((p: string) => p.trim())
                        // 根据位置设置计划项位置
                        let positionStyles = {}
                        switch(dim.position) {
                          case 'top':
                            positionStyles = { top: '15%', left: '50%', transform: 'translateX(-50%)' }
                            break
                          case 'top-right':
                            positionStyles = { top: '25%', right: '20%' }
                            break
                          case 'right':
                            positionStyles = { top: '50%', right: '20%', transform: 'translateY(-50%)' }
                            break
                          case 'bottom-right':
                            positionStyles = { bottom: '25%', right: '20%' }
                            break
                          case 'bottom':
                            positionStyles = { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }
                            break
                          case 'bottom-left':
                            positionStyles = { bottom: '25%', left: '20%' }
                            break
                          case 'left':
                            positionStyles = { top: '50%', left: '20%', transform: 'translateY(-50%)' }
                            break
                          case 'top-left':
                            positionStyles = { top: '25%', left: '20%' }
                            break
                        }
                        
                        return nonEmptyPlans.length > 0 ? (
                          <VStack
                            key={dim.id}
                            position="absolute"
                            spacing={0}
                            {...positionStyles}
                            maxW="100px"
                            zIndex="0"
                          >
                            {nonEmptyPlans.map((plan: string, idx: number) => (
                              <Text
                                key={idx}
                                fontSize="xs"
                                textAlign="center"
                                fontWeight="medium"
                              >
                                {plan}
                              </Text>
                            ))}
                          </VStack>
                        ) : null
                      })}
                    </Flex>
                  </Box>
                </Box>
                
                {/* 右侧: 输入表单 */}
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" mb={2}>填写我的计划</Heading>
                  <Text fontSize="sm" color="gray.600">
                    为每个生活维度填写1-3个具体计划（每个维度最多3项）
                  </Text>
                  
                  <Tabs variant="enclosed" size="sm">
                    <TabList>
                      {dimensions.map(dim => (
                        <Tab key={dim.id}>{dim.name}</Tab>
                      ))}
                    </TabList>
                    
                    <TabPanels>
                      {dimensions.map(dim => (
                        <TabPanel key={dim.id}>
                          <VStack spacing={3} align="stretch">
                            <Text fontWeight="bold" fontSize="sm">{dim.name}</Text>
                            {[0, 1, 2].map(idx => (
                              <Box key={idx}>
                                <Text fontSize="xs" mb={1}>计划 {idx + 1}</Text>
                                <Textarea
                                  placeholder={`输入${dim.name}的第${idx + 1}个计划...`}
                                  size="sm"
                                  value={plans[dim.id][idx]}
                                  onChange={(e) => handlePlanChange(dim.id, idx, e.target.value)}
                                />
                              </Box>
                            ))}
                          </VStack>
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                  
                  <Divider my={2} />
                  
                  <Text fontSize="sm" mt={2}>
                    记住：开满鲜花的花园，不会长草！让我们开始平衡生活的各个方面吧。
                  </Text>
                </VStack>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
} 