'use client'

import React, { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  IconButton,
  Tooltip,
  Progress,
  Divider,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaCheckCircle, FaClock, FaInbox, FaPlus, FaChevronDown, FaTasks } from 'react-icons/fa'
import { Project, ProjectStatus } from '@/types/project'

interface ProjectListProps {
  projects: Project[]
  onViewProject: (project: Project) => void
  onEditProject: (project: Project) => void
  onDeleteProject: (projectId: string) => void
  onManageTasks: (project: Project) => void
}

// 模拟项目数据
const initialProjects: Project[] = [
  {
    id: '1',
    title: '极客版米家全屋智能系统搭建',
    description: '米家自动化设备版改造家庭智能设备',
    status: '进行中',
    progress: 0,
    dueDate: new Date('2024-11-30'),
    category: '家庭',
    tags: ['智能家居', '自动化']
  },
  {
    id: '2',
    title: '完成阿里云服务器搭建个人网站及相关应用',
    description: '包括服务器部署、域名配置、网站搭建等',
    status: '计划中',
    progress: 0,
    dueDate: new Date('2024-11-12'),
    category: '学习',
    tags: ['服务器', '网站']
  },
  {
    id: '3',
    title: '读完 2024 年认知提相关书籍',
    description: '阅读一系列关于认知心理学的书籍',
    status: '进行中',
    progress: 50,
    category: '学习',
    tags: ['阅读', '认知']
  }
]

// 按状态过滤项目
const filterProjectsByStatus = (projects: Project[], status: ProjectStatus | 'All'): Project[] => {
  if (status === 'All') return projects
  return projects.filter(project => project.status === status)
}

// 项目列表组件
const ProjectList: React.FC<ProjectListProps> = ({ 
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject,
  onManageTasks
}) => {
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'All'>('All')
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const filteredProjects = filterProjectsByStatus(projects, filterStatus)
  
  // 状态计数
  const statusCounts = {
    '进行中': projects.filter(p => p.status === '进行中').length,
    '计划中': projects.filter(p => p.status === '计划中').length,
    '待分配': projects.filter(p => p.status === '待分配').length,
    '已完成': projects.filter(p => p.status === '已完成').length,
    'Inbox': projects.filter(p => p.status === 'Inbox').length,
  }

  // 处理状态更改
  const handleStatusChange = (project: Project, newStatus: ProjectStatus) => {
    const updatedProject = { ...project, status: newStatus }
    onEditProject(updatedProject)
  }

  return (
    <Box>
      <HStack spacing={4} mb={6} overflowX="auto" pb={2}>
        <Button 
          leftIcon={<FaCheckCircle />}
          variant={filterStatus === 'All' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('All')}
        >
          全部
        </Button>
        <Button 
          leftIcon={<FaClock />}
          variant={filterStatus === '进行中' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('进行中')}
        >
          进行中 ({statusCounts['进行中']})
        </Button>
        <Button 
          leftIcon={<FaClock />}
          variant={filterStatus === '计划中' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('计划中')}
        >
          计划中 ({statusCounts['计划中']})
        </Button>
        <Button 
          leftIcon={<FaClock />}
          variant={filterStatus === '待分配' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('待分配')}
        >
          待分配 ({statusCounts['待分配']})
        </Button>
        <Button 
          leftIcon={<FaCheckCircle />}
          variant={filterStatus === '已完成' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('已完成')}
        >
          已完成 ({statusCounts['已完成']})
        </Button>
        <Button 
          leftIcon={<FaInbox />}
          variant={filterStatus === 'Inbox' ? 'solid' : 'outline'}
          onClick={() => setFilterStatus('Inbox')}
        >
          Inbox ({statusCounts['Inbox']})
        </Button>
      </HStack>

      <Button leftIcon={<FaPlus />} colorScheme="teal" mb={6}>
        添加新项目
      </Button>

      <VStack spacing={4} align="stretch">
        {filteredProjects.map(project => (
          <Box 
            key={project.id}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg={bgColor}
            borderColor={borderColor}
            shadow="sm"
            cursor="pointer"
            onClick={() => onViewProject(project)}
          >
            <HStack justify="space-between" mb={2}>
              <Heading size="md">{project.title}</Heading>
              <HStack>
                <Menu>
                  <MenuButton 
                    as={Button} 
                    rightIcon={<FaChevronDown />} 
                    size="sm"
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.status}
                  </MenuButton>
                  <MenuList onClick={(e) => e.stopPropagation()}>
                    <MenuItem onClick={() => handleStatusChange(project, '进行中')}>进行中</MenuItem>
                    <MenuItem onClick={() => handleStatusChange(project, '计划中')}>计划中</MenuItem>
                    <MenuItem onClick={() => handleStatusChange(project, '待分配')}>待分配</MenuItem>
                    <MenuItem onClick={() => handleStatusChange(project, '已完成')}>已完成</MenuItem>
                    <MenuItem onClick={() => handleStatusChange(project, 'Inbox')}>Inbox</MenuItem>
                  </MenuList>
                </Menu>
                <Tooltip label="编辑">
                  <IconButton
                    aria-label="编辑项目"
                    icon={<FaEdit />}
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditProject(project)
                    }}
                  />
                </Tooltip>
                <Tooltip label="管理任务">
                  <IconButton
                    aria-label="管理任务"
                    icon={<FaTasks />}
                    size="sm"
                    variant="ghost"
                    colorScheme="teal"
                    onClick={(e) => {
                      e.stopPropagation()
                      onManageTasks(project)
                    }}
                  />
                </Tooltip>
                <Tooltip label="删除">
                  <IconButton
                    aria-label="删除项目"
                    icon={<FaTrash />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteProject(project.id)
                    }}
                  />
                </Tooltip>
              </HStack>
            </HStack>
            
            <Text mb={3}>{project.description}</Text>
            
            {project.dueDate && (
              <Text fontSize="sm" mb={2}>
                截止日期: {project.dueDate.toLocaleDateString()}
              </Text>
            )}
            
            <HStack mb={3}>
              {project.category && (
                <Badge colorScheme="purple">{project.category}</Badge>
              )}
              {project.tags?.map(tag => (
                <Badge key={tag} colorScheme="blue">{tag}</Badge>
              ))}
            </HStack>
            
            <Box>
              <Text fontSize="sm" mb={1}>进度: {project.progress}%</Text>
              <Progress value={project.progress} size="sm" colorScheme="teal" />
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default ProjectList 