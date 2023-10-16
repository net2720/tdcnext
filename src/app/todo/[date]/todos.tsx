'use client';
import { useState, useEffect } from 'react';
import TodoForm from './todoForm';

type FormProps = {
  date: string;
};

type Todo = {
  id: number;
  date: string;
  content: string;
  isFinished: boolean;
};

export default function Todos(props: FormProps) {
  const [allTodo, setAllTodo] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.apiUrl || '/api/read';
        const response = await fetch(apiUrl, {
          cache: 'no-store',
        });
        const data = await response.json();
        setAllTodo(data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    }
    fetchData();
  }, []);
  const date = props.date;
  const filteredTodos = allTodo.filter((todo) => todo.date === date);
  return (
    <>
      {filteredTodos.map((todo) => (
        <TodoForm key={todo.id} todo={todo} />
      ))}
    </>
  );
}
