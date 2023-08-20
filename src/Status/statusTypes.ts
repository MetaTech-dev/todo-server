export interface CreateStatusDTO {
  title: string;
  position: number;
}

export interface UpdateStatusDTO {
  title?: string;
  position?: number;
  id: string;
}
