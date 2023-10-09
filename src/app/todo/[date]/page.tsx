import Form from './form';
import Input from './input';
import Todos from './todos';

type FormProps = {
  params: { date: string };
};

export default function Todo(props: FormProps) {
  return (
    <>
      <Form date={props.params.date} />
      <Input date={props.params.date} />
      <Todos date={props.params.date} />
    </>
  );
}
