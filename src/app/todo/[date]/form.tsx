'use client';
import './form.css';

type FormProps = {
  date: string;
};

export default function Form(props: FormProps) {
  const date = props.date;
  const modifyDate = () => {
    return date ? date.slice(4) : 'error';
  };
  const setDate = () => {
    const modifiedDate = modifyDate();
    const month = parseInt(modifiedDate.substring(0, 2));
    const day = parseInt(modifiedDate.substring(2, 4));

    if (isNaN(month) || isNaN(day)) {
      return 'Invalid Date';
    }
    return `${month}/${day}`;
  };
  return (
    <main className="todo-list-form">
      <div className="title">
        <div className="date">{setDate()}</div>
      </div>
    </main>
  );
}
