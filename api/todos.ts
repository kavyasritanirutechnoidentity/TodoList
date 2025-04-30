// const API_URL = 'http://localhost:3001/todos';

// export const fetchTodos = async () => {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error('Failed to fetch todos');
//   return res.json();
// };

// export const addTodo = async (text: string) => {
//   const res = await fetch(API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ text }),
//   });
//   if (!res.ok) throw new Error('Failed to add todo');
//   return res.json();
// };

// export const deleteTodo = async (id: number) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   });
//   if (!res.ok) throw new Error('Failed to delete todo');
//   return res.json();
// };

// export const updateTodo = async ({ id, text }: { id: number; text: string }) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ text }),
//   });
//   if (!res.ok) throw new Error('Failed to update todo');
//   return res.json();
// };

const API_URL = 'http://localhost:3001/todos';

export const fetchTodos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const addTodo = async (text: string) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
};

export const deleteTodo = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  // Return the ID of the deleted todo to update the UI
  return id;
};

export const updateTodo = async ({ id, text }: { id: number; text: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};
