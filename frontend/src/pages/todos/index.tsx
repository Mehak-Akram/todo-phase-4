import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { todoAPI } from '../../services/api';
import { authService } from '../../services/auth';
import { Todo } from '../../types';
import AddTodo from '../../components/Todo/AddTodo';
import TodoList from '../../components/Todo/TodoList';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/auth/signin');
    }
  }, []);

  // Load todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await todoAPI.getTodos();
        // Ensure response.data.todos is an array before setting
        const todosData = Array.isArray(response.data.todos) ? response.data.todos : [];
        setTodos(todosData);
      } catch (err: any) {
        setError(err.message || 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    if (authService.isAuthenticated()) {
      fetchTodos();
    }
  }, []);

  const handleAddTodo = async (content: string) => {
    try {
      const response = await todoAPI.createTodo(content);
      setTodos([response.data, ...todos]);
    } catch (err: any) {
      setError(err.message || 'Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id: string, content: string) => {
    try {
      const response = await todoAPI.updateTodo(id, content);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await todoAPI.toggleTodoComplete(id, !completed);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
    }
  };

  const handleSignOut = () => {
    authService.signout();
    router.push('/auth/signin');
  };

  if (loading) {
    return (
      <div className="container bg-white text-blue-600 min-h-screen">
        <Head>
          <title>My Todos - Todo App</title>
          <meta name="description" content="Your todo list" />
        </Head>
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-blue-600">Loading your todos...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container bg-white text-blue-600">
      <Head>
        <title>My Todos - Todo App</title>
        <meta name="description" content="Your todo list" />
      </Head>

      <header className="py-4 text-blue-600">
        <h1 className="text-4xl font-extrabold text-blue-600">My Todos</h1>
      </header>

      {error && (
        <div className="p-3 mb-4 text-red-300 bg-red-900 rounded-md">
          {error}
        </div>
      )}

      <main className="py-4">
        <AddTodo onAddTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>
    </div>
  );
}