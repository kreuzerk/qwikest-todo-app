import { CreateAndUpdateTodo, Todo } from '~/routes/todos/[id]';

let id = 1;

let todos: Todo[] = [
  {
    id: 0,
    todo: 'Clean the kitchen',
    done: false,
  },
  {
    id: 1,
    todo: 'Bring out the trash',
    done: true,
  },
];

export function getTodos() {
  return todos;
}

export function addTodo(todo: CreateAndUpdateTodo): Todo {
  const newTodo: Todo = {
    id: ++id,
    ...todo,
  };
  todos = [...todos, newTodo];
  return newTodo;
}

export function updateTodo(id: number, updatedTodo: CreateAndUpdateTodo){
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index] = {
    ...todos[index],
    ...updatedTodo,
  };
  return todos[index];
}

export function deleteTodo(id: number): Todo | undefined {
  const todoToDelete = todos.find((todo) => todo.id === id);
  todos = todos.filter((todo) => todo.id !== id);
  return todoToDelete;
}
