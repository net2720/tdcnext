import React from 'react';
import RootLayout from './layout';
import Calendar from './calendar/page';

type Todo = {
  id: number;
  date: string;
  content: string;
  isFinished: boolean;
};

export default function Home() {
  return <Calendar />;
}
