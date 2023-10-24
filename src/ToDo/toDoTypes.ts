export interface CreateToDoDTO {
  title: string;
  description: string;
  author?: string;
  createdDate?: string;
  dueDate?: string | Date;
  assignee?: string;
  priority: string;
  status: string;
}

export interface UpdateToDoDTO {
  title?: string;
  description?: string;
  author?: string;
  createdDate?: string;
  dueDate?: string | Date;
  assignee?: string;
  priority?: string;
  status?: string;
  id: number;
}
