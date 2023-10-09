import React from 'react';
import RootLayout from './layout';
import Calender from './calendar/page';

type Todo = {
  id: number;
  date: string;
  content: string;
  isFinished: boolean;
};

export default async function Home() {
  const response = await fetch(`http://localhost:3000/api/read`, {
    cache: 'no-store',
  });
  const allTodo = await response.json();
  return <Calender db={allTodo} />;
}
