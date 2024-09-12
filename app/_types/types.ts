export interface Todo {
  title: string;
  description: string;
  priority: number;
  dueDate?: string;
  dueTime?: string;
  allDay?: boolean;
  category?: string;
}
