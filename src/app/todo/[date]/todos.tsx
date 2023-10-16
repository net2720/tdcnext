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
  const apiUrl = process.env.API_URL + 'api/read';
  const response = await fetch(apiUrl, {
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
