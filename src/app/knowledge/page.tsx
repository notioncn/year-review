'use client'

import { 
  Box, 
  Heading, 
  Text, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Grid,
  GridItem,
  Flex,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Icon,
  Divider,
  useColorModeValue,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { 
  FiSearch, 
  FiFolder, 
  FiBook, 
  FiFileText, 
  FiArchive, 
  FiPlus, 
  FiEdit, 
  FiCheck, 
  FiCpu, 
  FiTarget,
  FiBox,
  FiLayers,
  FiClock,
  FiBookmark
} from 'react-icons/fi'
import { useState } from 'react'
import BackToHome from '@/components/layout/BackToHome'

// PARA方法的四个主要部分
const paraCategories = [
  { 
    id: 'projects', 
    name: '项目（Projects）', 
    icon: FiFolder, 
    color: 'blue.500', 
    description: '有明确目标和截止日期的任务集合',
    items: [
      { id: 'p1', name: '年度总结文章', tags: ['写作', '反思'] },
      { id: 'p2', name: '建筑资格考试备考', tags: ['学习', '考试'] },
      { id: 'p3', name: 'BIM技能提升', tags: ['技能', '专业'] }
    ]
  },
  { 
    id: 'areas', 
    name: '领域（Areas）', 
    icon: FiTarget, 
    color: 'green.500', 
    description: '需要持续维护的生活和工作责任领域',
    items: [
      { id: 'a1', name: '学习笔记', tags: ['持续', '知识积累'] },
      { id: 'a2', name: '读书笔记', tags: ['阅读', '思考'] },
      { id: 'a3', name: '课程笔记', tags: ['学习', '技能提升'] }
    ]
  },
  { 
    id: 'resources', 
    name: '资源（Resources）', 
    icon: FiBox, 
    color: 'purple.500', 
    description: '可能在未来有用的参考资料和信息',
    items: [
      { id: 'r1', name: '收集箱（Inbox）', tags: ['未分类', '待处理'] },
      { id: 'r2', name: '知识库', tags: ['参考', '资料'] },
      { id: 'r3', name: '灵感素材', tags: ['创意', '想法'] }
    ]
  },
  { 
    id: 'archives', 
    name: '归档（Archives）', 
    icon: FiArchive, 
    color: 'gray.500', 
    description: '已完成或不再活跃的项目和信息',
    items: [
      { id: 'ar1', name: '已完成项目资料', tags: ['历史', '参考'] },
      { id: 'ar2', name: '过往笔记整理', tags: ['历史', '知识'] },
      { id: 'ar3', name: '存档文档', tags: ['备份', '历史'] }
    ]
  }
]

// 知识管理工作流程
const workflowSteps = [
  { 
    id: 'capture', 
    name: '捕捉', 
    icon: FiBookmark, 
    description: '使用flomo记录灵感笔记和想法',
    tools: ['Flomo', '笔记应用']
  },
  { 
    id: 'organize', 
    name: '整理', 
    icon: FiLayers, 
    description: '将笔记转移到Notion的收集箱，进行初步分类',
    tools: ['Notion', '分类系统']
  },
  { 
    id: 'distill', 
    name: '提炼', 
    icon: FiCpu, 
    description: '使用Obsidian进行深度处理，提取知识晶体',
    tools: ['Obsidian', '卡片盒笔记法']
  },
  { 
    id: 'express', 
    name: '表达', 
    icon: FiEdit, 
    description: '输出文章、视频或其他形式的创作',
    tools: ['写作工具', '费曼学习法']
  },
  { 
    id: 'review', 
    name: '复盘', 
    icon: FiClock, 
    description: '定期回顾和更新知识库',
    tools: ['日历提醒', '复盘模板']
  }
]

// 最近笔记示例
const recentNotes = [
  { id: 'n1', title: 'AI模型工程师职责和发展路径', category: 'areas', date: '2024-03-20', type: '学习笔记' },
  { id: 'n2', title: 'BIM入门课程第三章重点', category: 'projects', date: '2024-03-18', type: '课程笔记' },
  { id: 'n3', title: '《精读》如何有效阅读一本书笔记', category: 'areas', date: '2024-03-15', type: '读书笔记' },
  { id: 'n4', title: '渐构思维：从零到整体的设计方法', category: 'resources', date: '2024-03-10', type: '灵感素材' }
]

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const accentColor = useColorModeValue('teal.500', 'teal.300')
  
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* 页面标题和搜索栏 */}
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg">知识管理系统</Heading>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="搜索知识库..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius="full"
              />
            </InputGroup>
          </Flex>
          
          {/* 知识管理系统概述 */}
          <Card variant="outline" p={4}>
            <CardBody>
              <HStack align="start" spacing={4}>
                <VStack align="start" flex="2">
                  <Heading size="md" mb={2}>知识管理流程</Heading>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    基于PARA方法和I-P-O (Input-Process-Output) 工作流的个人知识管理系统
                  </Text>
                  <Flex wrap="wrap" gap={4}>
                    {workflowSteps.map((step, index) => (
                      <Flex 
                        key={step.id} 
                        direction="column" 
                        align="center" 
                        p={3}
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="md"
                        position="relative"
                        minW="120px"
                      >
                        {index > 0 && (
                          <Box 
                            position="absolute" 
                            left="-22px" 
                            top="50%" 
                            transform="translateY(-50%)"
                            fontSize="lg"
                            color="gray.400"
                          >
                            →
                          </Box>
                        )}
                        <Icon as={step.icon} boxSize="6" color={accentColor} mb={2} />
                        <Text fontWeight="bold" fontSize="sm">{step.name}</Text>
                        <Text fontSize="xs" textAlign="center" mt={1}>{step.description}</Text>
                        <HStack mt={2} spacing={1} flexWrap="wrap" justify="center">
                          {step.tools.map(tool => (
                            <Badge key={tool} colorScheme="teal" fontSize="2xs" px={1}>
                              {tool}
                            </Badge>
                          ))}
                        </HStack>
                      </Flex>
                    ))}
                  </Flex>
                </VStack>
                
                <Divider orientation="vertical" height="auto" />
                
                <VStack align="start" flex="1">
                  <Heading size="md" mb={2}>最近更新</Heading>
                  <List spacing={3} width="100%">
                    {recentNotes.map(note => (
                      <ListItem key={note.id} fontSize="sm">
                        <HStack>
                          <Icon 
                            as={
                              note.type === '学习笔记' ? FiBook : 
                              note.type === '课程笔记' ? FiFileText : 
                              note.type === '读书笔记' ? FiBook : FiBookmark
                            }
                            color={
                              note.category === 'projects' ? 'blue.500' :
                              note.category === 'areas' ? 'green.500' :
                              note.category === 'resources' ? 'purple.500' : 'gray.500'
                            }
                          />
                          <Text fontWeight="medium">{note.title}</Text>
                        </HStack>
                        <Flex ml={6} mt={1} justifyContent="space-between">
                          <Badge size="sm" colorScheme="gray">{note.type}</Badge>
                          <Text fontSize="xs" color="gray.500">{note.date}</Text>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
          
          {/* PARA分类系统 */}
          <Tabs variant="soft-rounded" colorScheme="teal" onChange={setActiveTab} index={activeTab}>
            <TabList>
              {paraCategories.map(category => (
                <Tab key={category.id}>
                  <Icon as={category.icon} mr={2} />
                  <Text>{category.name}</Text>
                </Tab>
              ))}
            </TabList>
            
            <TabPanels mt={4}>
              {paraCategories.map(category => (
                <TabPanel key={category.id} px={0}>
                  <VStack align="stretch" spacing={4}>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <HStack>
                          <Icon as={category.icon} boxSize="6" color={category.color} />
                          <Heading size="md">{category.name}</Heading>
                        </HStack>
                        <Text mt={1} fontSize="sm" color="gray.600">{category.description}</Text>
                      </Box>
                      
                      <Button size="sm" leftIcon={<FiPlus />} colorScheme="teal">
                        添加{category.id === 'projects' ? '项目' : 
                           category.id === 'areas' ? '领域' : 
                           category.id === 'resources' ? '资源' : '归档'}
                      </Button>
                    </Flex>
                    
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      {category.items.map(item => (
                        <Card key={item.id} variant="outline" p={0} overflow="hidden">
                          <Box bg={category.color} h="5px" />
                          <CardBody p={4}>
                            <Heading size="sm" mb={2}>{item.name}</Heading>
                            <Flex mt={2} wrap="wrap" gap={2}>
                              {item.tags.map(tag => (
                                <Badge key={tag} colorScheme="gray" fontSize="xs">
                                  {tag}
                                </Badge>
                              ))}
                            </Flex>
                          </CardBody>
                          <CardFooter 
                            p={2} 
                            bg={useColorModeValue('gray.50', 'gray.700')}
                            borderTop="1px solid"
                            borderColor={borderColor}
                          >
                            <Button size="xs" variant="ghost" leftIcon={<FiEdit />} flex="1">
                              编辑
                            </Button>
                            <Button size="xs" variant="ghost" leftIcon={<FiFileText />} flex="1">
                              查看
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {/* 添加新项目的卡片 */}
                      <Card 
                        variant="outline" 
                        p={4} 
                        bg={useColorModeValue('gray.50', 'whiteAlpha.50')}
                        borderStyle="dashed"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
                        h="100%"
                      >
                        <VStack>
                          <Icon as={FiPlus} boxSize="6" color="gray.400" />
                          <Text color="gray.500" fontSize="sm">添加新{
                            category.id === 'projects' ? '项目' : 
                            category.id === 'areas' ? '领域' : 
                            category.id === 'resources' ? '资源' : '归档'
                          }</Text>
                        </VStack>
                      </Card>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          
          {/* 知识管理系统说明 */}
          <Card>
            <CardBody>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton px={0}>
                    <Box flex="1" textAlign="left">
                      <Heading size="md">PARA方法说明</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <Box>
                        <Heading size="sm" mb={2}>知识管理结构</Heading>
                        <Box 
                          p={4} 
                          bg={useColorModeValue('gray.50', 'gray.700')} 
                          borderRadius="md"
                          fontFamily="monospace"
                          fontSize="sm"
                          whiteSpace="pre"
                        >
                          {`知识管理结构：
├── Projects（项目相关）
│   └── 按项目分类存储
├── Areas（领域）
│   ├── 学习笔记
│   ├── 读书笔记
│   └── 课程笔记
├── Resources（资源）
│   ├── 收集箱（Inbox）
│   └── 知识库
└── Archives（归档）
    └── 已完成项目资料`}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Heading size="sm" mb={2}>知识管理工作流</Heading>
                        <VStack align="start" spacing={2}>
                          <Text fontSize="sm">
                            1. 平日：看到喜欢的资源或相关资源，利用flomo记录并同步到Notion中的收集箱
                          </Text>
                          <Text fontSize="sm">
                            2. 微信读书中的读书笔记储存到领域-学习里面的"阅读笔记"
                          </Text>
                          <Text fontSize="sm">
                            3. 各类线上课程笔记储存到领域-学习里面的"课程笔记"
                          </Text>
                          <Text fontSize="sm">
                            4. 学习到的灵感，都回馈到领域-发表，积累源源不断的点子
                          </Text>
                          <Text fontSize="sm">
                            5. 发表文章或视频，都收纳成归档，等待下一次使用场景出现
                          </Text>
                        </VStack>
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  )
}