'use client';
import { useRouter } from 'next/navigation';
import './todoForm.css';

type Todo = {
  id: number;
  date: string;
  content: string;
  isFinished: boolean;
};

type TodoProps = {
  todo: Todo;
};

export default function TodoForm({ todo }: TodoProps) {
  const router = useRouter();

  const handleFinishCheck = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id, isFinished: !todo.isFinished }),
    };
    fetch(`http://localhost:3000/api/update`, options)
      .then((res) => res.json())
      .then(() => {
        router.refresh();
      });
  };

  const handleDelete = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id }),
    };
    fetch(`http://localhost:3000/api/delete`, options)
      .then((res) => res.json())
      .then(() => {
        router.refresh();
      });
  };
  return (
    <div className="todo-form" key={todo.id}>
      <button
        onClick={handleFinishCheck}
        className={todo.isFinished ? 'red-button' : 'green-button'}
      >
        {todo.isFinished ? '취소' : '완료'}
      </button>
      {todo.content}
      <button onClick={handleDelete} className="gray-button">
        삭제
      </button>
    </div>
  );
}
