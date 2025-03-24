'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  FormErrorMessage,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightElement,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { Project, ProjectStatus } from '@/types/project'

// 表单项目类型（部分字段可选）
interface FormProject extends Omit<Project, 'id' | 'status'> {
  id?: string;
  status: ProjectStatus;
}

interface ProjectFormProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const defaultProject: FormProject = {
  title: '',
  description: '',
  status: '计划中',
  progress: 0,
  tags: []
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  project = defaultProject, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<FormProject>(project as FormProject)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [tagInput, setTagInput] = useState<string>('')
  
  const toast = useToast()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // 清除错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const handleProgressChange = (value: string) => {
    setFormData(prev => ({ ...prev, progress: parseInt(value) || 0 }))
  }
  
  const handleAddTag = () => {
    if (!tagInput.trim()) return
    
    if (!formData.tags) {
      setFormData(prev => ({ ...prev, tags: [tagInput] }))
    } else if (!formData.tags.includes(tagInput)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags!, tagInput] }))
    }
    setTagInput('')
  }
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag)
    }))
  }
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title) {
      newErrors.title = '请输入项目标题'
    }
    
    if (!formData.description) {
      newErrors.description = '请输入项目描述'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    // 确保dueDate字段是Date类型
    const formattedData: Project = {
      ...(formData as unknown as Project),
      id: formData.id || Math.random().toString(36).substring(2, 9),
      dueDate: formData.dueDate ? 
        (typeof formData.dueDate === 'string' ? new Date(formData.dueDate) : formData.dueDate) 
        : undefined
    }
    
    onSave(formattedData)
    toast({
      title: '成功',
      description: `项目${formData.id ? '更新' : '创建'}成功`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formData.id ? '编辑项目' : '创建新项目'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired isInvalid={!!errors.title}>
                <FormLabel>项目标题</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="输入项目标题"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              
              <FormControl isRequired isInvalid={!!errors.description}>
                <FormLabel>项目描述</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="详细描述这个项目"
                  rows={3}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>状态</FormLabel>
                  <Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="进行中">进行中</option>
                    <option value="计划中">计划中</option>
                    <option value="待分配">待分配</option>
                    <option value="已完成">已完成</option>
                    <option value="Inbox">Inbox</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>完成进度</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={formData.progress}
                    onChange={handleProgressChange}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>截止日期</FormLabel>
                  <Input
                    name="dueDate"
                    type="date"
                    value={typeof formData.dueDate === 'object' && formData.dueDate instanceof Date 
                      ? formData.dueDate.toISOString().split('T')[0] 
                      : formData.dueDate || ''}
                    onChange={handleChange}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>类别</FormLabel>
                  <Select 
                    name="category" 
                    value={formData.category || ''}
                    onChange={handleChange}
                    placeholder="选择类别"
                  >
                    <option value="工作">工作</option>
                    <option value="学习">学习</option>
                    <option value="家庭">家庭</option>
                    <option value="健康">健康</option>
                    <option value="财务">财务</option>
                    <option value="兴趣">兴趣</option>
                  </Select>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>标签</FormLabel>
                <InputGroup>
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="添加标签"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="添加标签"
                      icon={<FaPlus />}
                      size="sm"
                      onClick={handleAddTag}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Box>
                <HStack spacing={2} wrap="wrap">
                  {formData.tags?.map(tag => (
                    <Tag
                      key={tag}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      mt={2}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
              </Box>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProjectForm 