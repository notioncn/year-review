'use client'

import React from 'react'
import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  VStack,
  Progress,
  Divider,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { FaCheck, FaClock, FaTag, FaCalendarAlt, FaFolder, FaTasks } from 'react-icons/fa'
import { Project, ProjectStatus, Task } from '@/types/project'

interface ProjectDetailsProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onEdit: (project: Project) => void
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  project, 
  isOpen, 
  onClose, 
  onEdit 
}) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  
  if (!project) return null
  
  // 获取状态对应的颜色
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case '进行中': return 'yellow'
      case '计划中': return 'blue'
      case '待分配': return 'purple'
      case '已完成': return 'green'
      case 'Inbox': return 'gray'
      default: return 'gray'
    }
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>项目详情</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                {project.title}
              </Heading>
              <Badge colorScheme={getStatusColor(project.status)} fontSize="md" mb={4}>
                {project.status}
              </Badge>
              <Text fontSize="md">{project.description}</Text>
            </Box>
            
            <Divider />
            
            <HStack spacing={10}>
              <VStack align="start" spacing={2}>
                <HStack>
                  <FaCalendarAlt />
                  <Text fontWeight="bold">截止日期</Text>
                </HStack>
                <Text>{project.dueDate ? project.dueDate.toLocaleDateString() : '无截止日期'}</Text>
              </VStack>
              
              <VStack align="start" spacing={2}>
                <HStack>
                  <FaFolder />
                  <Text fontWeight="bold">类别</Text>
                </HStack>
                <Text>{project.category || '未分类'}</Text>
              </VStack>
            </HStack>
            
            <Box>
              <HStack mb={2}>
                <FaTasks />
                <Text fontWeight="bold">进度</Text>
              </HStack>
              <Text mb={2}>{project.progress}% 完成</Text>
              <Progress 
                value={project.progress} 
                size="md" 
                colorScheme={project.progress === 100 ? 'green' : 'blue'} 
                rounded="md"
              />
            </Box>
            
            {project.tags && project.tags.length > 0 && (
              <Box>
                <HStack mb={2}>
                  <FaTag />
                  <Text fontWeight="bold">标签</Text>
                </HStack>
                <HStack wrap="wrap">
                  {project.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      colorScheme="blue" 
                      variant="subtle" 
                      py={1} 
                      px={2}
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            )}
            
            {project.tasks && project.tasks.length > 0 && (
              <Box>
                <HStack mb={2}>
                  <FaTasks />
                  <Text fontWeight="bold">待办事项</Text>
                </HStack>
                <List spacing={2}>
                  {project.tasks.map(task => (
                    <ListItem key={task.id}>
                      <HStack>
                        <ListIcon 
                          as={task.completed ? FaCheck : FaClock} 
                          color={task.completed ? 'green.500' : 'yellow.500'} 
                        />
                        <Text textDecoration={task.completed ? 'line-through' : 'none'}>
                          {task.title}
                        </Text>
                        {task.dueDate && (
                          <Text fontSize="sm" color="gray.500">
                            {task.dueDate.toLocaleDateString()}
                          </Text>
                        )}
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            关闭
          </Button>
          <Button colorScheme="blue" onClick={() => onEdit(project)}>
            编辑
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProjectDetails 