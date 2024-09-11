export interface Todo {
  title: string;
  description: string;
  priority: number;
  dueDate?: string; // dueDateを追加
  dueTime?: string; // dueTimeを追加
  allDay?: boolean; // allDayを追加
}
