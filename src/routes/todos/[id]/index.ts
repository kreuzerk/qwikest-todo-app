import { RequestHandler } from '@builder.io/qwik-city';

import { deleteTodo, updateTodo } from "~/state/todos-state";

export const onPut: RequestHandler = async ({ params, request }) => {
  const todo = await request.json();
  return updateTodo(+params.id, todo);
};

export const onDelete: RequestHandler = async ({ params }) => {
  return deleteTodo(+params.id);
};
