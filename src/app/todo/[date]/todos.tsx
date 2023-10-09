import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default async function Todos(props: FormProps) {
  const date = props.date;
  const response = await fetch(`http://localhost:3000/api/read`, {
    cache: 'no-store',
  });
  const allTodo: Todo[] = await response.json();
  const filteredTodos = allTodo.filter((todo) => todo.date === date);
  return (
    <>
      {filteredTodos.map((todo) => (
        <TodoForm key={todo.id} todo={todo} />
      ))}
    </>
  );
}
