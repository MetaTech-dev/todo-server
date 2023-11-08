export interface CreateToDoDTO {
  title: string;
  description: string;
  createdDate?: string;
  dueDate?: string | Date;
  priority: string;
  statusId: number;
}

export interface UpdateToDoDTO {
  title?: string;
  description?: string;
  createdDate?: string;
  dueDate?: string | Date;
  priority?: string;
  statusId?: number;
  id: number;
}
