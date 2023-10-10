'use client';
import './calendar.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';

type Todo = {
  id: number;
  date: string;
  content: string;
  isFinished: boolean;
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/read`, {
          cache: 'no-store',
        });
        const data = await response.json();
        setAllTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const dbDateFormat = 'yyyyMMdd';

  type Day = {
    date: Date;
    url: string;
  };

  const days: Day[] = [];
  let day = startDate;
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, 'yyyyMMdd');
      const url = `/todo/${formattedDate}`;
      days.push({ date: day, url });
      day = addDays(day, 1);
    }
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="button" onClick={prevMonth}>
          이전
        </button>
        <span className="calendar-header-font">
          {format(currentDate, 'yyyy MM')}
        </span>
        <button className="button" onClick={nextMonth}>
          다음
        </button>
      </div>
      <div className="calendar-days">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-cells">
        {days.map(({ date, url }, index) => (
          <Link href={url} key={index}>
            <div
              key={index}
              className={`calendar-cell day ${
                isSameMonth(date, monthStart) ? '' : 'disabled'
              } ${isSameDay(date, new Date()) ? 'today' : ''}`}
            >
              <div className="date-div">{format(date, dateFormat)}</div>
              <div className="todo-count-div">
                {isLoading
                  ? 0
                  : allTodos.filter(
                      (todo) => todo.date === format(date, dbDateFormat)
                    ).length}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
