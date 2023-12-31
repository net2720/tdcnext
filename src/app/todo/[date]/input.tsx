'use client';
import { useState } from 'react';
import './input.css';

type InputProps = {
  date: string;
};

export default function Input(props: InputProps) {
  const [newTodo, setNewTodo] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCreate();
    }
  };

  const onCreate = () => {
    if (newTodo !== '') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: props.date,
          content: newTodo,
        }),
      };
      const apiUrl = process.env.apiUrl || '/api/create';
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(() => {
          window.location.href = `/todo/${props.date}`;
        });
    }
  };
  return (
    <div className="input">
      <input
        className="input-form"
        id="input"
        value={newTodo}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className="create-button" onClick={() => onCreate()}>
        추가
      </button>
    </div>
  );
}
