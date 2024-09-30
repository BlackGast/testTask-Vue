
import { defineStore } from 'pinia';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]') as Todo[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: Todo = { id: Date.now(), text, completed: false };
      this.todos.push(newTodo);
      this.saveToLocalStorage();
    },
    editTodo(id: number, text: string) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        this.saveToLocalStorage();
      }
    },
    toggleTodoCompletion(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveToLocalStorage();
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
  },
});
