export interface User {
  id: string;
  email: string;
}

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TodoResponse {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}