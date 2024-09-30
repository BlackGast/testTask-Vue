<template>
  <div>
    <h1>To-Do List</h1>
    <input v-model="newTodoText" @keyup.enter="addNewTodo" placeholder="Add a new task" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }" @click="toggleTodoCompletion(todo.id)">
          {{ todo.text }}
        </span>
        <button @click="editTodoPrompt(todo.id)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default defineComponent({
  setup() {
    const todoStore = useTodoStore();
    const newTodoText = ref('');

    const todos = computed(() => todoStore.todos);

    const addNewTodo = () => {
      if (newTodoText.value.trim()) {
        todoStore.addTodo(newTodoText.value);
        newTodoText.value = '';
      }
    };

    const editTodoPrompt = (id: number) => {
      const newText = prompt('Edit the task text:');
      if (newText) {
        todoStore.editTodo(id, newText);
      }
    };

    const toggleTodoCompletion = (id: number) => {
      todoStore.toggleTodoCompletion(id);
    };

    const deleteTodo = (id: number) => {
      todoStore.deleteTodo(id);
    };

    return {
      newTodoText,
      todos,
      addNewTodo,
      editTodoPrompt,
      toggleTodoCompletion,
      deleteTodo,
    };
  },
});
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

button {
  margin-left: 10px;
  padding: 5px;
  background-color: #ff5722;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
