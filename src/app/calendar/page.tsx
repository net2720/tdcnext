'use client';
import './calendar.css';
import React, { useState } from 'react';
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

type CalenderPorps = {
  db: Todo[];
};

export default function Calender(props: CalenderPorps) {
  const [currentDate, setCurrentDate] = useState(new Date());

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
        <button onClick={prevMonth}>Prev</button>
        <span className="calendar-header-font">
          {format(currentDate, 'yyyy MM')}
        </span>
        <button onClick={nextMonth}>Next</button>
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
                {
                  props.db.filter(
                    (todo) => todo.date === format(date, dbDateFormat)
                  ).length
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
