'use client'

import { useState } from 'react'
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
  Button,
  Flex,
  Divider,
  Card,
  CardBody,
  Icon,
  SimpleGrid,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FaWallet, FaChartBar, FaCalendarAlt } from 'react-icons/fa'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import BackToHome from '@/components/layout/BackToHome'

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// 定义账户类型
interface Account {
  id: string;
  name: string;
  balance: number;
  type: '现金' | '银行卡' | '支付宝' | '微信';
}

// 定义交易类型
interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  accountId: string;
  type: '收入' | '支出';
}

export default function FinancePage() {
  // 账户数据
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: '微信账户', balance: 1000, type: '微信' },
    { id: '2', name: '浦发银行账户', balance: 5000, type: '银行卡' }
  ]);
  
  // 收入分类
  const incomeCategories = [
    '工资', '兼职', '投资收益', '理财收益', '红包', '其他收入'
  ];
  
  // 支出分类
  const expenseCategories = [
    '餐饮', '购物', '交通', '住房', '娱乐', '医疗', '教育', '旅游', '其他'
  ];
  
  // 交易数据
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-06-20', amount: 5000, category: '工资', description: '6月工资', accountId: '2', type: '收入' },
    { id: '2', date: '2024-06-25', amount: 200, category: '餐饮', description: '午餐', accountId: '1', type: '支出' },
    { id: '3', date: '2024-06-30', amount: 500, category: '购物', description: '日用品', accountId: '1', type: '支出' },
    { id: '4', date: '2024-07-05', amount: 300, category: '交通', description: '打车', accountId: '1', type: '支出' },
    { id: '5', date: '2024-07-10', amount: 1000, category: '住房', description: '水电费', accountId: '2', type: '支出' },
  ]);
  
  // 处理图表数据
  const chartData = {
    labels: ['微信账户', '浦发银行账户'],
    datasets: [
      {
        label: '购物支出',
        data: [500, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: '无标题',
        data: [0, 1000],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: '无标题',
        data: [0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  // 当前选择的月份
  const [selectedMonth, setSelectedMonth] = useState('2024-07');
  
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <Heading size="lg" mb={6}>财务管理系统</Heading>
        
        {/* 设计原理展示 */}
        <Accordion defaultIndex={[0]} mb={6}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text fontWeight="bold">設計原理</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={2}>
                <Text>1. 我想要列出不同的账户</Text>
                <Text>2. 我想要分门别类列出我的开支/收入</Text>
                <Text>3. 我想要以月為單位去記錄結算我的理財</Text>
                <Text>4. 我想要找到為什麼我的開銷這麼高</Text>
                <Text>5. 我想要釐清 需要/想要</Text>
                <Text>6. 所以初始金额从2024年6月20日起算</Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        
        {/* 主要功能区 */}
        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>
              <HStack spacing={2}>
                <Icon as={FaWallet} />
                <Text>账户管理</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Icon as={AddIcon} color="green.500" />
                <Text>收入系统</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Icon as={MinusIcon} color="red.500" />
                <Text>支出系统</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Icon as={FaChartBar} />
                <Text>数据分析</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* 账户管理面板 */}
            <TabPanel>
              <Box>
                <Heading size="md" mb={4}>我的账户</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={4}>
                  {accounts.map(account => (
                    <Card key={account.id} variant="outline">
                      <CardBody>
                        <VStack align="start">
                          <Text fontWeight="bold">{account.name}</Text>
                          <Text>类型: {account.type}</Text>
                          <Text color={account.balance >= 0 ? "green.500" : "red.500"} fontWeight="bold">
                            余额: ¥{account.balance.toFixed(2)}
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                  <Card variant="outline" borderStyle="dashed">
                    <CardBody>
                      <Flex height="100%" alignItems="center" justifyContent="center">
                        <Button leftIcon={<AddIcon />} variant="ghost">
                          添加新账户
                        </Button>
                      </Flex>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>
            </TabPanel>

            {/* 收入系统面板 */}
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <HStack justifyContent="space-between">
                  <Heading size="md">收入记录</Heading>
                  <Button leftIcon={<AddIcon />} colorScheme="green" size="sm">
                    添加收入
                  </Button>
                </HStack>
                
                <HStack spacing={4} mb={4}>
                  <Select placeholder="选择账户" width="200px">
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </Select>
                  <Select placeholder="选择月份" width="200px" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="2024-06">2024年6月</option>
                    <option value="2024-07">2024年7月</option>
                    <option value="2024-08">2024年8月</option>
                  </Select>
                </HStack>
                
                <Box borderWidth="1px" borderRadius="lg" p={4}>
                  <VStack align="stretch" spacing={3}>
                    {transactions
                      .filter(t => t.type === '收入')
                      .map(transaction => (
                        <Box key={transaction.id} p={3} borderWidth="1px" borderRadius="md">
                          <Flex justifyContent="space-between" alignItems="center">
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="bold">{transaction.category}</Text>
                              <Text fontSize="sm" color="gray.600">{transaction.description}</Text>
                              <Text fontSize="xs" color="gray.500">{transaction.date}</Text>
                            </VStack>
                            <Text color="green.500" fontWeight="bold">+¥{transaction.amount.toFixed(2)}</Text>
                          </Flex>
                        </Box>
                      ))}
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* 支出系统面板 */}
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <HStack justifyContent="space-between">
                  <Heading size="md">支出记录</Heading>
                  <Button leftIcon={<MinusIcon />} colorScheme="red" size="sm">
                    添加支出
                  </Button>
                </HStack>
                
                <HStack spacing={4} mb={4}>
                  <Select placeholder="选择账户" width="200px">
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </Select>
                  <Select placeholder="按分类筛选" width="200px">
                    <option value="all">全部分类</option>
                    {expenseCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                  <Select placeholder="选择月份" width="200px" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="2024-06">2024年6月</option>
                    <option value="2024-07">2024年7月</option>
                    <option value="2024-08">2024年8月</option>
                  </Select>
                </HStack>
                
                <Box borderWidth="1px" borderRadius="lg" p={4}>
                  <VStack align="stretch" spacing={3}>
                    {transactions
                      .filter(t => t.type === '支出')
                      .map(transaction => (
                        <Box key={transaction.id} p={3} borderWidth="1px" borderRadius="md">
                          <Flex justifyContent="space-between" alignItems="center">
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="bold">{transaction.category}</Text>
                              <Text fontSize="sm" color="gray.600">{transaction.description}</Text>
                              <Text fontSize="xs" color="gray.500">{transaction.date}</Text>
                            </VStack>
                            <HStack>
                              <Text fontSize="sm" color="gray.500">
                                {accounts.find(a => a.id === transaction.accountId)?.name}
                              </Text>
                              <Text color="red.500" fontWeight="bold">-¥{transaction.amount.toFixed(2)}</Text>
                            </HStack>
                          </Flex>
                        </Box>
                      ))}
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* 数据分析面板 */}
            <TabPanel>
              <VStack align="stretch" spacing={6}>
                <HStack spacing={4}>
                  <Heading size="md">支出分析</Heading>
                  <Select placeholder="选择月份" width="200px" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="2024-06">2024年6月</option>
                    <option value="2024-07">2024年7月</option>
                    <option value="2024-08">2024年8月</option>
                  </Select>
                </HStack>
                
                <Box p={4} borderWidth="1px" borderRadius="lg">
                  <Heading size="sm" mb={4}>各账户支出</Heading>
                  <Box height="300px">
                    <Bar options={chartOptions} data={chartData} />
                  </Box>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <Heading size="sm" mb={4}>支出分类占比</Heading>
                    <Text textAlign="center" color="gray.500">图表占位 - 分类饼图</Text>
                  </Box>
                  <Box p={4} borderWidth="1px" borderRadius="lg">
                    <Heading size="sm" mb={4}>月度支出趋势</Heading>
                    <Text textAlign="center" color="gray.500">图表占位 - 趋势线图</Text>
                  </Box>
                </SimpleGrid>
                
                <Box p={4} borderWidth="1px" borderRadius="lg">
                  <Heading size="sm" mb={4}>需要 vs 想要分析</Heading>
                  <Text mb={2}>本月"需要"支出: ¥1300.00</Text>
                  <Text mb={4}>本月"想要"支出: ¥500.00</Text>
                  <Text color="gray.600">
                    "需要"指必要的生活支出如住房、食物、交通等，"想要"指可选择性的消费如娱乐、额外购物等。
                  </Text>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Box mt={8}>
          <Button size="sm" colorScheme="blue" rightIcon={<Icon as={FaCalendarAlt} />}>
            快速添加
          </Button>
        </Box>
      </Box>
    </Box>
  )
} 