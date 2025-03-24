'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Heading, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Button,
  Input,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  IconButton,
  Flex,
  Badge,
  SimpleGrid,
  Link,
  Tooltip
} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CalendarIcon, StarIcon, TimeIcon, LinkIcon, ExternalLinkIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { FaTasks, FaCalendarAlt } from 'react-icons/fa'
import NextLink from 'next/link'
import BackToHome from '@/components/layout/BackToHome'

// 引入类型
import { Task } from '@/types/project'

// 定义习惯类型接口
type HabitKey = '运动' | '阅读' | '写作'

interface DailyHabits {
  运动: boolean;
  阅读: boolean;
  写作: boolean;
}

// 添加目标、规划和计划的类型接口
interface YearlyGoal {
  id: string;
  content: string;
  completed?: boolean;
}

interface MonthlyPlan {
  id: string;
  month: number; // 0-11
  content: string;
  completed?: boolean;
}

interface QuarterlyGoal {
  id: string;
  quarter: number; // 1-4
  content: string;
  status: 'planned' | 'in-progress' | 'completed';
}

interface MonthlyGoal {
  id: string;
  content: string;
  status: 'planned' | 'in-progress' | 'habit' | 'completed';
  completed?: boolean;
}

interface WeeklyGoal {
  id: string;
  content: string;
  status: 'planned' | 'in-progress' | 'habit' | 'completed';
  completed?: boolean;
}

// 添加检视清单数据在组件外部
export default function TimePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [dailyHabits, setDailyHabits] = useState<DailyHabits>({
    运动: false,
    阅读: false,
    写作: false
  })
  
  // 添加目标和规划相关状态
  const [yearlyGoals, setYearlyGoals] = useState<YearlyGoal[]>([
    { id: 'yg-1', content: '搭建个人知识管理系统' },
    { id: 'yg-2', content: '建立时间管理体系' },
    { id: 'yg-3', content: '每日执行IPO系统养成' }
  ])
  
  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlan[]>([])
  
  const [quarterlyGoals, setQuarterlyGoals] = useState<QuarterlyGoal[]>([
    { id: 'qg-1', quarter: 1, content: '搭建每日执行IPO系统', status: 'in-progress' },
    { id: 'qg-2', quarter: 1, content: '建立目标管理体系', status: 'planned' },
    { id: 'qg-3', quarter: 2, content: '输出3篇高质量文章', status: 'planned' }
  ])
  
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>([
    { id: 'mg-1', content: '完成时间管理系统搭建', status: 'in-progress', completed: false },
    { id: 'mg-2', content: '每天执行IPO系统', status: 'habit', completed: false },
    { id: 'mg-3', content: '读完《跃迁》并整理笔记', status: 'planned', completed: false }
  ])
  
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    { id: 'wg-1', content: '完成时间管理系统V1版本', status: 'in-progress', completed: false },
    { id: 'wg-2', content: '日常执行IPO系统5天以上', status: 'habit', completed: false }
  ])
  
  // 添加新内容状态
  const [newYearlyGoal, setNewYearlyGoal] = useState('')
  const [newMonthlyPlan, setNewMonthlyPlan] = useState('')
  const [newQuarterlyGoal, setNewQuarterlyGoal] = useState('')
  const [selectedQuarter, setSelectedQuarter] = useState(1)
  const [newMonthlyGoal, setNewMonthlyGoal] = useState('')
  const [newWeeklyGoal, setNewWeeklyGoal] = useState('')
  
  // 项目任务相关状态
  const [projectTasks, setProjectTasks] = useState<Task[]>([
    // 示例任务数据
    {
      id: 'task-1',
      title: '完成时间管理系统设计',
      completed: false,
      dueDate: new Date('2024-03-26'),
      projectId: 'project-1'
    },
    {
      id: 'task-2',
      title: '实现IPO系统周检视功能',
      completed: false,
      dueDate: new Date('2024-03-27'),
      projectId: 'project-1'
    },
    {
      id: 'task-3',
      title: '集成项目任务到日习惯打卡',
      completed: false,
      dueDate: new Date('2024-03-24'), // 今天
      projectId: 'project-1'
    },
    {
      id: 'task-4',
      title: '撰写知识管理系统文档',
      completed: false,
      dueDate: new Date('2024-03-28'),
      projectId: 'project-2'
    },
    {
      id: 'task-5',
      title: '完成IPO系统使用指南',
      completed: true,
      dueDate: new Date('2024-03-22'),
      projectId: 'project-1'
    }
  ])
  
  // 示例项目数据
  const projectsMap = {
    'project-1': {
      id: 'project-1',
      title: '时间管理系统',
      status: '进行中'
    },
    'project-2': {
      id: 'project-2',
      title: '知识管理系统',
      status: '计划中'
    }
  }
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const accentColor = useColorModeValue('blue.500', 'blue.300')
  
  // 添加目标、规划和计划的处理函数
  const handleYearlyGoalToggle = (goalId: string) => {
    setYearlyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ))
  }
  
  const handleAddYearlyGoal = () => {
    if (newYearlyGoal.trim() === '') return
    setYearlyGoals(prev => [...prev, {
      id: `yg-${Date.now()}`,
      content: newYearlyGoal,
      completed: false
    }])
    setNewYearlyGoal('')
  }
  
  const handleMonthlyPlanAdd = (month: number) => {
    if (newMonthlyPlan.trim() === '') return
    setMonthlyPlans(prev => [...prev, {
      id: `mp-${Date.now()}`,
      month,
      content: newMonthlyPlan,
      completed: false
    }])
    setNewMonthlyPlan('')
  }
  
  const handleQuarterlyGoalAdd = () => {
    if (newQuarterlyGoal.trim() === '') return
    setQuarterlyGoals(prev => [...prev, {
      id: `qg-${Date.now()}`,
      quarter: selectedQuarter,
      content: newQuarterlyGoal,
      status: 'planned'
    }])
    setNewQuarterlyGoal('')
  }
  
  const handleQuarterlyGoalStatusChange = (goalId: string, status: 'planned' | 'in-progress' | 'completed') => {
    setQuarterlyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, status } : goal
    ))
  }
  
  const handleMonthlyGoalAdd = () => {
    if (newMonthlyGoal.trim() === '') return
    setMonthlyGoals(prev => [...prev, {
      id: `mg-${Date.now()}`,
      content: newMonthlyGoal,
      status: 'planned',
      completed: false
    }])
    setNewMonthlyGoal('')
  }
  
  const handleMonthlyGoalToggle = (goalId: string) => {
    setMonthlyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ))
  }
  
  const handleMonthlyGoalStatusChange = (goalId: string, status: 'planned' | 'in-progress' | 'habit' | 'completed') => {
    setMonthlyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, status } : goal
    ))
  }
  
  const handleWeeklyGoalAdd = () => {
    if (newWeeklyGoal.trim() === '') return
    setWeeklyGoals(prev => [...prev, {
      id: `wg-${Date.now()}`,
      content: newWeeklyGoal,
      status: 'planned',
      completed: false
    }])
    setNewWeeklyGoal('')
  }
  
  const handleWeeklyGoalToggle = (goalId: string) => {
    setWeeklyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ))
  }
  
  const handleWeeklyGoalStatusChange = (goalId: string, status: 'planned' | 'in-progress' | 'habit' | 'completed') => {
    setWeeklyGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, status } : goal
    ))
  }
  
  const handleDeleteYearlyGoal = (goalId: string) => {
    setYearlyGoals(prev => prev.filter(goal => goal.id !== goalId))
  }
  
  const handleDeleteQuarterlyGoal = (goalId: string) => {
    setQuarterlyGoals(prev => prev.filter(goal => goal.id !== goalId))
  }
  
  const handleDeleteMonthlyGoal = (goalId: string) => {
    setMonthlyGoals(prev => prev.filter(goal => goal.id !== goalId))
  }
  
  const handleDeleteWeeklyGoal = (goalId: string) => {
    setWeeklyGoals(prev => prev.filter(goal => goal.id !== goalId))
  }
  
  const handleHabitToggle = (habit: HabitKey) => {
    setDailyHabits(prev => ({
      ...prev,
      [habit]: !prev[habit]
    }))
  }
  
  // 处理任务完成状态切换
  const handleTaskToggle = (taskId: string) => {
    setProjectTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }
  
  // 获取今天的任务
  const getTodayTasks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return projectTasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      taskDate.setHours(0, 0, 0, 0)
      return taskDate.getTime() === today.getTime()
    })
  }
  
  // 获取本周的任务
  const getWeekTasks = () => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = 周日, 1 = 周一, ...
    
    // 调整为周一开始
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    
    // 计算本周的开始日期 (周一)
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - adjustedDay)
    weekStart.setHours(0, 0, 0, 0)
    
    // 计算本周的结束日期 (周日)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)
    
    return projectTasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate >= weekStart && taskDate <= weekEnd
    })
  }
  
  // 根据星期几获取当天任务
  const getDayTasks = (dayIndex: number) => {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = 周日, 1 = 周一, ...
    
    // 调整为周一开始
    const adjustedToday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    
    // 计算目标日期与今天的差距
    const diff = dayIndex - adjustedToday
    
    // 计算目标日期
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + diff)
    targetDate.setHours(0, 0, 0, 0)
    
    const targetEndDate = new Date(targetDate)
    targetEndDate.setHours(23, 59, 59, 999)
    
    return projectTasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate >= targetDate && taskDate <= targetEndDate
    })
  }
  
  // 月份数据
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  
  // 周数据
  const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  
  // 添加检视清单数据
  const workChecklistItems = [
    { id: 'w01', title: '我有哪些项目已经启动？哪些未完成？哪些需要启动？', description: '列出所有进行中、待启动和未完成的项目' },
    { id: 'w02', title: '我答应他人要做哪些事情？', description: '老板、同事、下属、客户、合作伙伴、其它组织' },
    { id: 'w03', title: '我需要进行的沟通有哪些？', description: '老板、同事、下属、客户、合作伙伴、其它组织' },
    { id: 'w04', title: '我有哪些书面材料要写？', description: '报告、评估、回顾、建议、文章、宣传材料、说明书、总结、会议记录、修改和编辑、进展汇报' },
    { id: 'w05', title: '我需要阅读和评论的有哪些？', description: '书籍、期刊、文章、报纸、打印的资料、网站、博客、播客' },
    { id: 'w06', title: '我自己在职业方面有哪些计划？', description: '短期目标、中期目标、长期目标、商业计划、营销计划、财务计划、近期活动' }
  ]

  const lifeChecklistItems = [
    { id: 'l15', title: '我在个人财务方面有哪些要做的事情？', description: '投资理财、收入来源、家庭资产负债表/现金流表、买房卖房、借款、保险、贷款、银行' },
    { id: 'l16', title: '我对他人做出了哪些承诺？', description: '伴侣、孩子、父母、家庭、朋友、专业人士、要归还的东西' },
    { id: 'l17', title: '我需要进行的沟通？', description: '伴侣、孩子、父母、家庭、朋友、专业人士' },
    { id: 'l18', title: '我近期要参加的活动？', description: '生日、纪念日、婚礼、毕业典礼、外出、假期、度假、其它外出、晚餐、聚会、访客' },
    { id: 'l19', title: '我个人环境有哪些要调整的地方？', description: '家庭办公用品、设备、电子设备、电话、音频/视频媒体、电话留言、电脑、网络、电视' },
    { id: 'l20', title: '我有哪些娱乐方面要做的事情？', description: '书籍、音乐、录像、旅行、想去的地方、想拜访的人、上网、拍照、运动设备、兴趣爱好' }
  ]

  const studyChecklistItems = [
    { id: 's01', title: '我有哪些学习项目已经启动？哪些未完成？哪些需要启动？', description: '已启动的学习项目（阅读计划、写作任务、课程学习、备考计划）、未完成的学习任务' },
    { id: 's02', title: '我需要阅读的内容有哪些？', description: '书籍清单及进度、待阅读的期刊文章/博客/学习资料、课程相关的学习材料、备考复习资料' },
    { id: 's03', title: '我需要完成的写作任务有哪些？', description: '论文、报告、学习心得、学术文章、案例分析、写作计划、写作进度、支持材料' },
    { id: 's04', title: '我需要参加的课程有哪些？', description: '在线课程（如Coursera、Udemy等）、线下课程、课程相关任务（作业、测验、项目）' },
    { id: 's05', title: '我需要完成的备考任务有哪些？', description: '学术考试、职业认证考试、备考计划、复习重点内容、模拟测试计划、备考资料' },
    { id: 's06', title: '我需要回顾的笔记有哪些？', description: '阅读笔记、课程笔记、备考笔记、笔记回顾计划' }
  ]
  
  // 获取当前日期
  const today = new Date()
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
  
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <Heading size="lg" mb={6}>时间管理系统</Heading>
        
        <Tabs variant="enclosed" colorScheme="blue" onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>理想的一年</Tab>
            <Tab>季度规划</Tab>
            <Tab>月度规划</Tab>
            <Tab>周规划</Tab>
            <Tab>日习惯打卡</Tab>
          </TabList>
          
          <TabPanels>
            {/* 理想的一年 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">2024年目标与规划</Heading>
                
                <Card variant="outline">
                  <CardBody>
                    <Heading size="sm" mb={4}>年度关键目标</Heading>
                    <VStack align="stretch" spacing={3}>
                      {yearlyGoals.map((goal) => (
                        <HStack key={goal.id}>
                          <Checkbox 
                            colorScheme="green" 
                            isChecked={goal.completed}
                            onChange={() => handleYearlyGoalToggle(goal.id)}
                          >
                            {goal.content}
                          </Checkbox>
                          <IconButton
                            aria-label="删除目标"
                            icon={<DeleteIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            ml="auto"
                            onClick={() => handleDeleteYearlyGoal(goal.id)}
                          />
                        </HStack>
                      ))}
                      <HStack mt={2}>
                        <Input 
                          placeholder="输入新的年度目标" 
                          value={newYearlyGoal}
                          onChange={(e) => setNewYearlyGoal(e.target.value)}
                          size="sm"
                        />
                        <Button 
                          size="sm" 
                          leftIcon={<AddIcon />} 
                          colorScheme="blue" 
                          onClick={handleAddYearlyGoal}
                        >
                          添加
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                  {months.map((month, index) => (
                    <GridItem key={index} colSpan={3}>
                      <Card variant="outline" h="200px" _hover={{ boxShadow: 'md' }} overflowY="auto">
                        <CardBody>
                          <Heading size="sm" mb={2}>{month}</Heading>
                          {monthlyPlans.filter(plan => plan.month === index).map(plan => (
                            <HStack key={plan.id} mt={1}>
                              <Checkbox 
                                size="sm"
                                colorScheme="green" 
                                isChecked={plan.completed}
                                onChange={() => {
                                  setMonthlyPlans(prev => prev.map(p => 
                                    p.id === plan.id ? { ...p, completed: !p.completed } : p
                                  ))
                                }}
                              >
                                <Text fontSize="sm">{plan.content}</Text>
                              </Checkbox>
                            </HStack>
                          ))}
                          <HStack mt={2}>
                            <Input 
                              placeholder="添加计划" 
                              size="xs"
                              value={index === parseInt(newMonthlyPlan.split('|')[0] || '-1') ? newMonthlyPlan.split('|')[1] || '' : ''}
                              onChange={(e) => setNewMonthlyPlan(`${index}|${e.target.value}`)}
                            />
                            <IconButton
                              aria-label="添加计划"
                              icon={<AddIcon />}
                              size="xs"
                              colorScheme="blue"
                              onClick={() => {
                                const content = newMonthlyPlan.split('|')[1] || '';
                                if (content.trim()) {
                                  handleMonthlyPlanAdd(index);
                                }
                              }}
                            />
                          </HStack>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </TabPanel>
            
            {/* 季度规划 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">2024年季度规划</Heading>
                
                <SimpleGrid columns={2} spacing={6}>
                  {quarterlyGoals
                    .filter(goal => goal.quarter <= 2)
                    .map((goal) => (
                    <Card variant="outline" key={goal.id}>
                      <CardBody>
                        <Heading size="sm" mb={4}>Q{goal.quarter}</Heading>
                        <VStack align="stretch" spacing={3}>
                          <HStack>
                            <Badge colorScheme={goal.status === 'completed' ? "green" : goal.status === 'in-progress' ? "yellow" : "gray"}>
                              {goal.status === 'completed' ? '已完成' : goal.status === 'in-progress' ? '进行中' : '规划中'}
                            </Badge>
                            <Text>{goal.content}</Text>
                            <IconButton
                              aria-label="删除目标"
                              icon={<DeleteIcon />}
                              size="xs"
                              colorScheme="red"
                              variant="ghost"
                              ml="auto"
                              onClick={() => handleDeleteQuarterlyGoal(goal.id)}
                            />
                          </HStack>
                          <Button size="sm" colorScheme="blue" variant="outline" mt={3} onClick={() => handleQuarterlyGoalStatusChange(goal.id, goal.status === 'planned' ? 'in-progress' : 'completed')}>
                            {goal.status === 'planned' ? '开始' : '完成'}
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                  
                  {[3, 4].map(quarter => {
                    const quarterGoals = quarterlyGoals.filter(goal => goal.quarter === quarter);
                    return (
                      <Card variant="outline" key={`q-${quarter}`}>
                        <CardBody>
                          <Heading size="sm" mb={4}>Q{quarter}</Heading>
                          {quarterGoals.map(goal => (
                            <VStack key={goal.id} align="stretch" spacing={3} mb={3}>
                              <HStack>
                                <Badge colorScheme={goal.status === 'completed' ? "green" : goal.status === 'in-progress' ? "yellow" : "gray"}>
                                  {goal.status === 'completed' ? '已完成' : goal.status === 'in-progress' ? '进行中' : '规划中'}
                                </Badge>
                                <Text>{goal.content}</Text>
                                <IconButton
                                  aria-label="删除目标"
                                  icon={<DeleteIcon />}
                                  size="xs"
                                  colorScheme="red"
                                  variant="ghost"
                                  ml="auto"
                                  onClick={() => handleDeleteQuarterlyGoal(goal.id)}
                                />
                              </HStack>
                              <Button size="sm" colorScheme="blue" variant="outline" mt={3} onClick={() => handleQuarterlyGoalStatusChange(goal.id, goal.status === 'planned' ? 'in-progress' : 'completed')}>
                                {goal.status === 'planned' ? '开始' : '完成'}
                              </Button>
                            </VStack>
                          ))}
                          
                          <HStack mb={3}>
                            <Input 
                              placeholder="输入季度目标" 
                              size="sm"
                              value={selectedQuarter === quarter ? newQuarterlyGoal : ''}
                              onChange={(e) => {
                                setSelectedQuarter(quarter);
                                setNewQuarterlyGoal(e.target.value);
                              }}
                            />
                            <Button 
                              size="sm" 
                              leftIcon={<AddIcon />} 
                              colorScheme="blue" 
                              onClick={handleQuarterlyGoalAdd}
                            >
                              添加
                            </Button>
                          </HStack>
                        </CardBody>
                      </Card>
                    );
                  })}
                </SimpleGrid>
              </VStack>
            </TabPanel>
            
            {/* 月度规划 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">2024年3月规划</Heading>
                
                <Card variant="outline">
                  <CardBody>
                    <Heading size="sm" mb={4}>本月目标</Heading>
                    <VStack align="stretch" spacing={3}>
                      {monthlyGoals.map((goal) => (
                        <HStack key={goal.id}>
                          <Checkbox 
                            colorScheme={goal.status === 'completed' ? "green" : goal.status === 'habit' ? "blue" : "gray"} 
                            isChecked={goal.completed}
                            onChange={() => handleMonthlyGoalToggle(goal.id)}
                          >
                            {goal.content}
                          </Checkbox>
                          <Badge ml="auto" colorScheme={goal.status === 'completed' ? "green" : goal.status === 'habit' ? "blue" : "yellow"}>
                            {goal.status === 'completed' ? '已完成' : goal.status === 'habit' ? '习惯养成' : '计划中'}
                          </Badge>
                          <IconButton
                            aria-label="状态切换"
                            icon={<CalendarIcon />}
                            size="xs"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => {
                              const nextStatus = goal.status === 'planned' ? 'in-progress' 
                                : goal.status === 'in-progress' ? 'habit'
                                : goal.status === 'habit' ? 'completed' : 'planned';
                              handleMonthlyGoalStatusChange(goal.id, nextStatus);
                            }}
                          />
                          <IconButton
                            aria-label="删除目标"
                            icon={<DeleteIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteMonthlyGoal(goal.id)}
                          />
                        </HStack>
                      ))}
                      <HStack mt={2}>
                        <Input 
                          placeholder="输入月度目标" 
                          value={newMonthlyGoal}
                          onChange={(e) => setNewMonthlyGoal(e.target.value)}
                          size="sm"
                        />
                        <Button 
                          size="sm" 
                          leftIcon={<AddIcon />} 
                          colorScheme="blue" 
                          onClick={handleMonthlyGoalAdd}
                        >
                          添加
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card variant="outline">
                  <CardBody>
                    <Heading size="sm" mb={4}>月度日历</Heading>
                    <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                      {weekdays.map((day, i) => (
                        <GridItem key={i}>
                          <Text fontWeight="bold" textAlign="center">{day}</Text>
                        </GridItem>
                      ))}
                      {Array(31).fill(0).map((_, i) => (
                        <GridItem key={i}>
                          <Box 
                            border="1px" 
                            borderColor={borderColor} 
                            borderRadius="md" 
                            p={2} 
                            textAlign="center"
                            _hover={{ bg: 'gray.50' }}
                          >
                            <Text>{i + 1}</Text>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
            
            {/* 周规划 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">本周规划（2024年第12周）</Heading>
                
                <Card variant="outline">
                  <CardBody>
                    <Heading size="sm" mb={4}>本周目标</Heading>
                    <VStack align="stretch" spacing={3}>
                      {weeklyGoals.map((goal) => (
                        <HStack key={goal.id}>
                          <Checkbox 
                            colorScheme={goal.status === 'completed' ? "green" : goal.status === 'habit' ? "blue" : "gray"} 
                            isChecked={goal.completed}
                            onChange={() => handleWeeklyGoalToggle(goal.id)}
                          >
                            {goal.content}
                          </Checkbox>
                          <Badge ml="auto" colorScheme={goal.status === 'completed' ? "green" : goal.status === 'habit' ? "blue" : "yellow"}>
                            {goal.status === 'completed' ? '已完成' : goal.status === 'habit' ? '习惯养成' : '计划中'}
                          </Badge>
                          <IconButton
                            aria-label="状态切换"
                            icon={<CalendarIcon />}
                            size="xs"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => {
                              const nextStatus = goal.status === 'planned' ? 'in-progress' 
                                : goal.status === 'in-progress' ? 'habit'
                                : goal.status === 'habit' ? 'completed' : 'planned';
                              handleWeeklyGoalStatusChange(goal.id, nextStatus);
                            }}
                          />
                          <IconButton
                            aria-label="删除目标"
                            icon={<DeleteIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteWeeklyGoal(goal.id)}
                          />
                        </HStack>
                      ))}
                      <HStack mt={2}>
                        <Input 
                          placeholder="输入周目标" 
                          value={newWeeklyGoal}
                          onChange={(e) => setNewWeeklyGoal(e.target.value)}
                          size="sm"
                        />
                        <Button 
                          size="sm" 
                          leftIcon={<AddIcon />} 
                          colorScheme="blue" 
                          onClick={handleWeeklyGoalAdd}
                        >
                          添加
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
                
                {/* 本周任务 */}
                <Card variant="outline">
                  <CardBody>
                    <HStack justify="space-between" mb={4}>
                      <Heading size="sm">本周项目任务</Heading>
                      <Link as={NextLink} href="/projects" color="blue.500">
                        <HStack>
                          <Text>查看所有项目</Text>
                          <ExternalLinkIcon />
                        </HStack>
                      </Link>
                    </HStack>
                    
                    <VStack align="stretch" spacing={3} mb={4}>
                      {getWeekTasks().length > 0 ? (
                        getWeekTasks().map(task => (
                          <Box key={task.id} p={3} borderWidth="1px" borderRadius="md">
                            <Flex justify="space-between" align="center">
                              <HStack>
                                <Checkbox 
                                  colorScheme="green" 
                                  isChecked={task.completed}
                                  onChange={() => handleTaskToggle(task.id)}
                                />
                                <Text textDecoration={task.completed ? "line-through" : "none"}>
                                  {task.title}
                                </Text>
                              </HStack>
                              <HStack>
                                <Badge 
                                  colorScheme={task.completed ? "gray" : "blue"}
                                >
                                  {projectsMap[task.projectId as keyof typeof projectsMap]?.title || '未知项目'}
                                </Badge>
                                <Tooltip label={`截止日期: ${task.dueDate?.toLocaleDateString()}`}>
                                  <Box>
                                    <FaCalendarAlt />
                                  </Box>
                                </Tooltip>
                              </HStack>
                            </Flex>
                          </Box>
                        ))
                      ) : (
                        <Box p={5} textAlign="center">
                          <Text color="gray.500">本周暂无项目任务</Text>
                        </Box>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
                
                <Table variant="simple" border="1px" borderColor={borderColor}>
                  <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                    <Tr>
                      <Th>时间/日期</Th>
                      {weekdays.map((day, i) => (
                        <Th key={i} textAlign="center">{day}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {['上午', '下午', '晚上'].map((timeSlot, i) => (
                      <Tr key={i}>
                        <Td fontWeight="bold">{timeSlot}</Td>
                        {weekdays.map((_, dayIndex) => {
                          const dayTasks = getDayTasks(dayIndex);
                          return (
                            <Td key={dayIndex} height="80px" width="14%" p={1}>
                              <Box 
                                height="100%" 
                                p={2} 
                                border="1px dashed" 
                                borderColor="gray.200" 
                                borderRadius="md"
                                bg={dayTasks.length > 0 ? "blue.50" : "transparent"}
                                _hover={{ bg: dayTasks.length > 0 ? "blue.100" : "gray.50" }}
                              >
                                {dayTasks.length > 0 ? (
                                  <VStack align="start" spacing={1}>
                                    {dayTasks.map(task => (
                                      <Text 
                                        key={task.id} 
                                        fontSize="xs" 
                                        noOfLines={1}
                                        textDecoration={task.completed ? "line-through" : "none"}
                                      >
                                        • {task.title}
                                      </Text>
                                    ))}
                                  </VStack>
                                ) : (
                                  <Text fontSize="xs" color="gray.500">点击添加任务</Text>
                                )}
                              </Box>
                            </Td>
                          );
                        })}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                
                <Card variant="outline" mt={6}>
                  <CardBody>
                    <Heading size="sm" mb={4}>周检视清单</Heading>
                    <Tabs variant="soft-rounded" colorScheme="green" size="sm">
                      <TabList>
                        <Tab>工作检视</Tab>
                        <Tab>学习检视</Tab>
                        <Tab>生活检视</Tab>
                      </TabList>
                      
                      <TabPanels mt={4}>
                        {/* 工作检视清单 */}
                        <TabPanel p={0}>
                          <VStack align="stretch" spacing={3} maxH="400px" overflowY="auto">
                            {workChecklistItems.map((item) => (
                              <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
                                <Flex>
                                  <Checkbox colorScheme="green" mr={3} />
                                  <Box>
                                    <Text fontWeight="medium">{item.title}</Text>
                                    <Text fontSize="sm" color="gray.500">{item.description}</Text>
                                  </Box>
                                </Flex>
                              </Box>
                            ))}
                          </VStack>
                        </TabPanel>
                        
                        {/* 学习检视清单 */}
                        <TabPanel p={0}>
                          <VStack align="stretch" spacing={3} maxH="400px" overflowY="auto">
                            {studyChecklistItems.map((item) => (
                              <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
                                <Flex>
                                  <Checkbox colorScheme="blue" mr={3} />
                                  <Box>
                                    <Text fontWeight="medium">{item.title}</Text>
                                    <Text fontSize="sm" color="gray.500">{item.description}</Text>
                                  </Box>
                                </Flex>
                              </Box>
                            ))}
                          </VStack>
                        </TabPanel>
                        
                        {/* 生活检视清单 */}
                        <TabPanel p={0}>
                          <VStack align="stretch" spacing={3} maxH="400px" overflowY="auto">
                            {lifeChecklistItems.map((item) => (
                              <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
                                <Flex>
                                  <Checkbox colorScheme="purple" mr={3} />
                                  <Box>
                                    <Text fontWeight="medium">{item.title}</Text>
                                    <Text fontSize="sm" color="gray.500">{item.description}</Text>
                                  </Box>
                                </Flex>
                              </Box>
                            ))}
                          </VStack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
            
            {/* 日习惯打卡 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">今日习惯打卡 ({formattedDate})</Heading>
                
                {/* 今日项目任务 */}
                <Card variant="outline">
                  <CardBody>
                    <HStack justify="space-between" mb={4}>
                      <Heading size="sm">今日项目任务</Heading>
                      <Link as={NextLink} href="/projects" color="blue.500">
                        <HStack>
                          <Text>管理项目</Text>
                          <ExternalLinkIcon />
                        </HStack>
                      </Link>
                    </HStack>
                    
                    <VStack align="stretch" spacing={3}>
                      {getTodayTasks().length > 0 ? (
                        getTodayTasks().map(task => (
                          <Box key={task.id} p={3} borderWidth="1px" borderRadius="md">
                            <Flex justify="space-between" align="center">
                              <HStack>
                                <Checkbox 
                                  colorScheme="green" 
                                  isChecked={task.completed}
                                  onChange={() => handleTaskToggle(task.id)}
                                />
                                <Text textDecoration={task.completed ? "line-through" : "none"}>
                                  {task.title}
                                </Text>
                              </HStack>
                              <Badge colorScheme="blue">
                                {projectsMap[task.projectId as keyof typeof projectsMap]?.title || '未知项目'}
                              </Badge>
                            </Flex>
                          </Box>
                        ))
                      ) : (
                        <Box p={5} textAlign="center">
                          <Text color="gray.500">今日暂无项目任务</Text>
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            variant="outline" 
                            leftIcon={<FaTasks />}
                            mt={2}
                            as={NextLink}
                            href="/projects"
                          >
                            添加任务
                          </Button>
                        </Box>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card variant="outline">
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Heading size="sm">每日执行IPO系统</Heading>
                        <HStack>
                          <TimeIcon />
                          <Text fontSize="sm">{new Date().toLocaleDateString()}</Text>
                        </HStack>
                      </HStack>
                      
                      <Divider />
                      
                      <Box>
                        <Heading size="xs" mb={3}>晨间启动系统 (6:30-8:00)</Heading>
                        <VStack align="stretch">
                          <Checkbox 
                            colorScheme="green" 
                            isChecked={dailyHabits.运动}
                            onChange={() => handleHabitToggle('运动')}
                          >
                            目标熔炉：SWOT分析筛选今日TOP3目标
                          </Checkbox>
                          <Checkbox colorScheme="green">能量充能：动态冥想+八段锦</Checkbox>
                          <Checkbox colorScheme="green">系统预检：检查今日待办</Checkbox>
                        </VStack>
                      </Box>
                      
                      <Box>
                        <Heading size="xs" mb={3}>上午生产力波 (8:30-11:30)</Heading>
                        <VStack align="stretch">
                          <Checkbox colorScheme="green">费曼技巧拆解课程章节</Checkbox>
                          <Checkbox colorScheme="green">更新进度看板</Checkbox>
                        </VStack>
                      </Box>
                      
                      <Box>
                        <Heading size="xs" mb={3}>下午专注波 (14:00-17:00)</Heading>
                        <VStack align="stretch">
                          <Checkbox 
                            colorScheme="green" 
                            isChecked={dailyHabits.阅读}
                            onChange={() => handleHabitToggle('阅读')}
                          >
                            阅读时间 (至少30分钟)
                          </Checkbox>
                          <Checkbox 
                            colorScheme="green" 
                            isChecked={dailyHabits.写作}
                            onChange={() => handleHabitToggle('写作')}
                          >
                            写作/输出 (至少30分钟)
                          </Checkbox>
                          {getTodayTasks().map(task => (
                            <Checkbox 
                              key={task.id}
                              colorScheme="blue" 
                              isChecked={task.completed}
                              onChange={() => handleTaskToggle(task.id)}
                            >
                              项目任务：{task.title}
                            </Checkbox>
                          ))}
                        </VStack>
                      </Box>
                      
                      <Box>
                        <Heading size="xs" mb={3}>晚间系统重启 (20:00-21:30)</Heading>
                        <VStack align="stretch">
                          <Checkbox colorScheme="green">反思回路：心流时刻回溯</Checkbox>
                          <Checkbox colorScheme="green">预演明日：分配核心时段</Checkbox>
                        </VStack>
                      </Box>
                      
                      <Button colorScheme="blue" leftIcon={<CheckIcon />}>
                        完成今日打卡
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card variant="outline">
                  <CardBody>
                    <Heading size="sm" mb={4}>习惯打卡统计</Heading>
                    <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={4}>
                      {weekdays.map((day, i) => (
                        <GridItem key={i}>
                          <Text fontWeight="bold" textAlign="center">{day}</Text>
                        </GridItem>
                      ))}
                      {Array(7).fill(0).map((_, i) => (
                        <GridItem key={i}>
                          <Box 
                            border="1px" 
                            borderColor={i === 3 ? accentColor : borderColor} 
                            borderRadius="md" 
                            p={2} 
                            textAlign="center"
                            bg={i < 3 ? "green.100" : "transparent"}
                          >
                            <Text>{i < 3 ? "已完成" : i === 3 ? "今日" : "待完成"}</Text>
                          </Box>
                        </GridItem>
                      ))}
                    </Grid>
                    
                    <HStack justify="space-between">
                      <Text>本周完成率：43%</Text>
                      <Text>本月完成率：38%</Text>
                    </HStack>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
} 