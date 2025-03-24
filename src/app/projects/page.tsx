'use client'

import React, { useState } from 'react'
import { 
  Box, 
  Heading, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  useDisclosure, 
  Button,
  Text,
  HStack,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast
} from '@chakra-ui/react'
import { FaPlus, FaTasks } from 'react-icons/fa'
import BackToHome from '@/components/layout/BackToHome'

import ProjectList from '@/components/projects/ProjectList'
import ProjectForm from '@/components/projects/ProjectForm'
import ProjectDetails from '@/components/projects/ProjectDetails'
import ProjectTasks from '@/components/projects/ProjectTasks'
import { Project, Task } from '@/types/project'

export default function ProjectsPage() {
  // 表单弹窗控制
  const { 
    isOpen: isFormOpen, 
    onOpen: onFormOpen, 
    onClose: onFormClose 
  } = useDisclosure()
  
  // 详情弹窗控制
  const { 
    isOpen: isDetailsOpen, 
    onOpen: onDetailsOpen, 
    onClose: onDetailsClose 
  } = useDisclosure()
  
  // 任务弹窗控制
  const { 
    isOpen: isTasksOpen, 
    onOpen: onTasksOpen, 
    onClose: onTasksClose 
  } = useDisclosure()
  
  // 项目数据
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const toast = useToast()
  
  // 处理添加项目按钮点击
  const handleAddProject = () => {
    setCurrentProject(null)
    setIsEditing(false)
    onFormOpen()
  }
  
  // 处理编辑项目
  const handleEditProject = (project: Project) => {
    setCurrentProject(project)
    setIsEditing(true)
    onFormOpen()
  }
  
  // 处理查看项目详情
  const handleViewProject = (project: Project) => {
    setCurrentProject(project)
    onDetailsOpen()
  }
  
  // 处理管理项目任务
  const handleManageTasks = (project: Project) => {
    setCurrentProject(project)
    onTasksOpen()
  }
  
  // 保存项目
  const handleSaveProject = (project: Project) => {
    if (isEditing && currentProject) {
      // 更新现有项目
      setProjects(projects.map(p => (
        p.id === currentProject.id ? { ...project, id: currentProject.id } : p
      )))
      toast({
        title: '项目已更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      // 添加新项目
      const newProject = {
        ...project,
        id: Math.random().toString(36).substring(2, 9),
      }
      setProjects([...projects, newProject])
      toast({
        title: '项目已创建',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  
  // 删除项目
  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId))
    toast({
      title: '项目已删除',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }
  
  // 保存任务
  const handleSaveTasks = (tasks: Task[]) => {
    if (!currentProject) return
    
    // 将任务添加到项目中
    const updatedProject = { ...currentProject, tasks }
    
    // 更新项目列表
    setProjects(projects.map(p => {
      if (p.id === currentProject.id) {
        return updatedProject
      }
      return p
    }))
    
    // 更新当前项目
    setCurrentProject(updatedProject)
  }
  
  return (
    <Box position="relative">
      <BackToHome />
      
      <Box p={6}>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">项目管理</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddProject}>
            新建项目
          </Button>
        </HStack>
        
        <Divider mb={6} />
        
        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>全部项目</Tab>
            <Tab>项目分析</Tab>
            <Tab>项目指南</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel p={0} pt={4}>
              {projects.length === 0 ? (
                <Alert 
                  status="info" 
                  variant="subtle" 
                  flexDirection="column" 
                  alignItems="center" 
                  justifyContent="center" 
                  textAlign="center" 
                  height="200px" 
                  borderRadius="md"
                  mt={4}
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    没有项目
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    开始创建您的第一个项目，有条理地管理您的工作和目标。
                  </AlertDescription>
                  <Button 
                    leftIcon={<FaPlus />} 
                    colorScheme="teal" 
                    mt={4} 
                    onClick={handleAddProject}
                  >
                    添加新项目
                  </Button>
                </Alert>
              ) : (
                <ProjectList 
                  projects={projects}
                  onViewProject={handleViewProject}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                  onManageTasks={handleManageTasks}
                />
              )}
            </TabPanel>
            
            <TabPanel>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={4}>项目统计分析</Heading>
                <Text>此功能正在开发中。您将能够查看项目进度统计、完成情况分析等。</Text>
              </Box>
            </TabPanel>
            
            <TabPanel>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading size="md" mb={4}>项目管理指南</Heading>
                <Text mb={3}>有效的项目管理系统按照以下原则设计：</Text>
                <Box pl={4}>
                  <Text mb={2}>1. 列出今年的所有目标</Text>
                  <Text mb={2}>2. 列出所有你想完成的项目</Text>
                  <Text mb={2}>3. 列出想要发展的领域</Text>
                  <Text mb={2}>4. 检视是否所有的领域/目标都有项目去推动</Text>
                  <Text mb={2}>5. 如果想不出相应项目，这个领域可能不重要或只是兴趣</Text>
                  <Text mb={2}>6. 执行中的项目不要超过6-7个，多余的放入Inbox</Text>
                  <Text mb={2}>7. 根据项目设置季度、月度、本周目标</Text>
                  <Text mb={2}>8. 为每个项目创建3-5个待办事项</Text>
                  <Text mb={2}>9. 项目完成后，设定自动反思待办事项</Text>
                  <Text mb={2}>10. 每周回顾并调整需要变更的事项</Text>
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* 项目表单弹窗 */}
        <ProjectForm 
          project={currentProject || undefined}
          isOpen={isFormOpen}
          onClose={onFormClose}
          onSave={handleSaveProject}
        />
        
        {/* 项目详情弹窗 */}
        <ProjectDetails 
          project={currentProject}
          isOpen={isDetailsOpen}
          onClose={onDetailsClose}
          onEdit={handleEditProject}
        />
        
        {/* 项目任务弹窗 */}
        {currentProject && (
          <ProjectTasks 
            projectId={currentProject.id}
            isOpen={isTasksOpen}
            onClose={onTasksClose}
            initialTasks={currentProject.tasks || []}
            onSave={handleSaveTasks}
          />
        )}
      </Box>
    </Box>
  )
} 