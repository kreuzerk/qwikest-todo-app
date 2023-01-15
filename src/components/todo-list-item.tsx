import { component$, PropFunction, useSignal } from '@builder.io/qwik';
import { Todo } from '~/routes/todos/[id]';

export interface TodoListItemProps {
  todo: Todo;
  todoDeleted$: PropFunction<(todo: Todo) => void>;
}

export default component$(
  ({ todo, todoDeleted$ }: TodoListItemProps) => {
    const done = useSignal(todo.done);

    return (
      <div
        class="flex items-center justify-between mb-4 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 cursor-pointer"
        onClick$={async () => {
          console.log('clicked', todo.todo);
          done.value = !done.value;
          await fetch(`todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              todo: todo.todo,
              done: done.value,
            }),
          });
        }}
      >
        <div class="flex items-center">
          {!done.value && (
            <span class="material-symbols-outlined text-red-800">
              radio_button_unchecked
            </span>
          )}
          {done.value && (
            <span class="material-symbols-outlined text-green-600">
              check_circle
            </span>
          )}
          <label
            class={`ml-2 text-lg leading-5 text-gray-700 ${
              done.value && 'line-through'
            }`}
            for="todos"
          >
            {todo.todo}
          </label>
        </div>
        <span
          class="material-symbols-outlined hover:text-blue-800 cursor-pointer"
          onClick$={async (event) => {
            event.stopPropagation();
            const response = await fetch(`todos/${todo.id}`, {
              method: 'DELETE',
            });
            todoDeleted$(await response.json());
          }}
        >
          delete
        </span>
      </div>
    );
  }
);
