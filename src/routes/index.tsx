import { component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import TodoInput from '~/components/todo-input';
import TodoListItem from '~/components/todo-list-item';
import { getTodos } from '~/state/todos-state';

export default component$(() => {
  const state = useStore({
    todos: getTodos(),
  });

  return (
    <div class="flex flex-col items-center h-screen bg-slate-100 relative">
      <div
        class="absolute w-full h-2/5 top-0 left-0 bg-mountains bg-cover bg-center bg-no-repeat"
        style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 94%)"
      ></div>
      <div
        class="absolute w-full h-2/5 top-0 left-0 right-0 bg-gradient-to-tl from-green-100/80 to-blue-400/90"
        style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 94%)"
      ></div>
      <div class="w-full max-w-2xl z-10 mt-56">
        <TodoInput
          todoAdded$={(todo) => (state.todos = [...state.todos, todo])}
        />
        {state.todos.map((todo, index) => (
          <TodoListItem
            key={index}
            todo={todo}
            todoDeleted$={(todo) => {
              state.todos = state.todos.filter((t) => t.id !== todo.id);
            }}
          />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Todo app',
  meta: [
    {
      name: 'description',
      content: 'Qwikest todo app',
    },
  ],
};
