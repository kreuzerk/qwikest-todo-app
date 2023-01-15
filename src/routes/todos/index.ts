import { RequestHandler } from '@builder.io/qwik-city';
import { addTodo } from '~/state/todos-state';

export const onPost: RequestHandler = async ({ request }) => {
  const todo = await request.json();
  return addTodo(todo);
};
