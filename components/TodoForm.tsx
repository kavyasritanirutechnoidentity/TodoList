import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../api/todos';

export default function TodoForm() {
  const [title, setTitle] = useState<string>('');  // Set title to string type
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle(''); // Reset title after successful addition
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      mutation.mutate({ title }); // Pass title for new todo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
