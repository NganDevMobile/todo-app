export interface Task {
  id?: string;
  name: string;
  description: string;
  date?: string;
  start?: string;
  end?: string;
  priority: number;
  status: string;
  catId: string;
}

export interface TaskAction {
  type: string;
  name: string;
}

export interface TaskStatus {
  type: string;
  name: string;
  color: string;
}
