export interface CreateStatusDTO {
  title: string;
  position: number;
  orgId: string;
}

export interface UpdateStatusDTO {
  title?: string;
  position?: number;
  id: number;
}
