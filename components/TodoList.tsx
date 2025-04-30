import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../api/todos';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Check } from 'lucide-react';

export default function TodoList() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  // Fetch Todos
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    onSuccess: (data) => {
      console.log('✅ Fetched todos:', data);
    },
    onError: (err) => {
      console.error('❌ Error fetching todos:', err);
    }
  });

  // Add Todo Mutation
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      console.log('➕ Added:', data);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => {
      console.error('❌ Add error:', err);
    }
  });

  // Delete Todo Mutation
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (id) => {
      console.log(`🗑️ Deleted todo with ID: ${id}`);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => {
      console.error('❌ Delete error:', err);
    }
  });

  // Update Todo Mutation
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data) => {
      console.log('✏️ Updated:', data);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => {
      console.error('❌ Update error:', err);
    }
  });

  // Form for adding todos
  const form = useForm({
    defaultValues: { text: '' },
    onSubmit: async ({ value }) => {
      if (value.text.trim()) {
        addTodoMutation.mutate(value.text);
        form.reset();
      }
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error instanceof Error) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Check className="w-6 h-6 text-green-600" /> Todo List
        </h1>

        {/* Add Todo Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex gap-2 mb-6"
        >
          <form.Field
            name="text"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="What's on your mind?"
                className="border px-3 py-2 rounded flex-grow outline-none"
              />
            )}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-300 rounded p-3 shadow-sm"
            >
              {editingId === todo.id ? (
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border px-2 py-1 flex-grow rounded"
                />
              ) : (
                <span className="flex items-center gap-2 text-lg">
                  <Check className="w-4 h-4 text-green-600" /> {todo.text}
                </span>
              )}

              <div className="flex items-center gap-2 ml-4">
                {editingId === todo.id ? (
                  <>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => {
                        updateTodoMutation.mutate({ id: todo.id, text: editingText });
                        setEditingId(null);
                        setEditingText('');
                      }}
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-500 hover:underline"
                      onClick={() => {
                        setEditingId(null);
                        setEditingText('');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-yellow-500 hover:underline"
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditingText(todo.text);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteTodoMutation.mutate(todo.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
