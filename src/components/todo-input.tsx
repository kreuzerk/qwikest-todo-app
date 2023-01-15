import {
  component$,
  PropFunction,
  useClientEffect$,
  useStore,
} from '@builder.io/qwik';
import { Todo } from '~/models/todo.model';

export interface TodoInputProps {
  todoAdded$: PropFunction<(addedTodo: Todo) => void>;
}

export default component$((props: TodoInputProps) => {
  const state = useStore<{
    inputField: HTMLInputElement | null;
  }>({
    inputField: null,
  });

  useClientEffect$(async () => {
    state.inputField = document.getElementById(
      'todo-input'
    ) as HTMLInputElement;
  });

  return (
    <>
      <form class="bg-white shadow-lg rounded p-10 mb-4">
        <div class="relative">
          <input
            id="todo-input"
            type="text"
            class="form-input border-slate-400 border py-3 px-4 block h-12 w-full leading-5 rounded-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            placeholder="Enter a TODO"
          />
          <button
            type="button"
            class="absolute rounded-r-full -right-3 -top-2 h-12 w-16 mt-2 mr-3 py-2 px-3 text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 text-2xl"
            onClick$={async () => {
              const addedTodoResponse = await fetch('todos', {
                method: 'POST',
                body: JSON.stringify({
                  todo: state.inputField!.value,
                  done: false,
                }),
              });
              state.inputField!.value = '';
              props.todoAdded$(await addedTodoResponse.json());
            }}
          >
            +
          </button>
        </div>
      </form>
    </>
  );
});
