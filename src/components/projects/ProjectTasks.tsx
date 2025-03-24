'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { FaCalendarAlt, FaTrash, FaPlus } from 'react-icons/fa'
import { format } from 'date-fns'
import { Task } from '@/types/project'

interface ProjectTasksProps {
  projectId: string
  isOpen: boolean
  onClose: () => void
  initialTasks?: Task[] | any[]
  onSave: (tasks: Task[]) => void
}

// 生成唯一ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({
  projectId,
  isOpen,
  onClose,
  initialTasks = [],
  onSave
}) => {
  // 确保任务都有projectId
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((task: any) => ({
      ...task,
      projectId: task.projectId || projectId
    }))
  )
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDate, setNewTaskDate] = useState<string>('')
  
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  
  // 添加新任务
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    
    const newTask: Task = {
      id: generateId(),
      title: newTaskTitle,
      completed: false,
      projectId,
      ...(newTaskDate ? { dueDate: new Date(newTaskDate) } : {})
    }
    
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
    setNewTaskDate('')
  }
  
  // 删除任务
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  
  // 更新任务状态
  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }
      }
      return task
    }))
  }
  
  // 保存任务
  const handleSave = () => {
    onSave(tasks)
    toast({
      title: '已保存',
      description: '项目任务已更新',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }
  
  // 对任务排序：未完成的在前，已完成的在后
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      // 如果完成状态相同，按截止日期排序
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.getTime() - b.dueDate.getTime()
    }
    // 未完成的排在前面
    return a.completed ? 1 : -1
  })
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>管理项目任务</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Flex>
              <Input 
                placeholder="添加新任务..." 
                value={newTaskTitle} 
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask()
                  }
                }}
                mr={2}
              />
              <Input 
                type="date" 
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                width="150px"
                mr={2}
              />
              <Button leftIcon={<FaPlus />} onClick={handleAddTask}>
                添加
              </Button>
            </Flex>
            
            <Divider />
            
            <Box>
              <Heading size="sm" mb={3}>待办任务 ({tasks.filter(t => !t.completed).length})</Heading>
              <List spacing={2}>
                {sortedTasks.filter(task => !task.completed).map(task => (
                  <ListItem 
                    key={task.id}
                    p={2}
                    borderWidth="1px"
                    borderRadius="md"
                    bg={bgColor}
                  >
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Checkbox 
                          isChecked={task.completed}
                          onChange={() => handleToggleComplete(task.id)}
                        />
                        <Text>{task.title}</Text>
                      </HStack>
                      <HStack>
                        {task.dueDate && (
                          <Tooltip label="截止日期">
                            <HStack spacing={1} color="gray.500">
                              <FaCalendarAlt size={14} />
                              <Text fontSize="sm">
                                {format(task.dueDate, 'yyyy-MM-dd')}
                              </Text>
                            </HStack>
                          </Tooltip>
                        )}
                        <Tooltip label="删除任务">
                          <IconButton
                            aria-label="删除任务"
                            icon={<FaTrash />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteTask(task.id)}
                          />
                        </Tooltip>
                      </HStack>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {sortedTasks.some(task => task.completed) && (
              <Box mt={4}>
                <Heading size="sm" mb={3}>已完成任务 ({tasks.filter(t => t.completed).length})</Heading>
                <List spacing={2}>
                  {sortedTasks.filter(task => task.completed).map(task => (
                    <ListItem 
                      key={task.id}
                      p={2}
                      borderWidth="1px"
                      borderRadius="md"
                      bg={bgColor}
                      opacity={0.7}
                    >
                      <Flex justify="space-between" align="center">
                        <HStack>
                          <Checkbox 
                            isChecked={task.completed}
                            onChange={() => handleToggleComplete(task.id)}
                          />
                          <Text textDecoration="line-through">{task.title}</Text>
                        </HStack>
                        <Tooltip label="删除任务">
                          <IconButton
                            aria-label="删除任务"
                            icon={<FaTrash />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteTask(task.id)}
                          />
                        </Tooltip>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProjectTasks 