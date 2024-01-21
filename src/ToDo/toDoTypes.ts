export interface CreateToDoDTO {
  title: string;
  description: string;
  createdDate?: string;
  dueDate?: string | Date;
  priority: string;
  statusId: number;
  authorUserId: string;
  assigneeUserId?: string;
  orgId: string;
}

export interface UpdateToDoDTO {
  title?: string;
  description?: string;
  createdDate?: string;
  dueDate?: string | Date;
  priority?: string;
  statusId?: number;
  authorUserId: string;
  assigneeUserId?: string;
  id: number;
}
