// 项目状态类型
export type ProjectStatus = '进行中' | '计划中' | '待分配' | '已完成' | 'Inbox'

// 任务类型
export interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: Date
  projectId: string
}

// 项目类型
export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  progress: number
  dueDate?: Date
  category?: string
  tags?: string[]
  tasks?: Task[]
} 