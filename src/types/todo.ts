export interface Todo {
  title: string;
  id: number | string;
  inserted_at: string;
  is_complete: boolean | null;
  task: string | null;
  user_id: string;
}

