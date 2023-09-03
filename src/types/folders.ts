import { Todo } from "./todo";

export interface Folder {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  todos?: Todo[];
}

