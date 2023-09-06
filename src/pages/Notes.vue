<template>
  <div class="w-full h-full flex justify-start">
    <Sidebar />
    <div class="w-2/3 p-16">
      <ul class="flex flex-col items-start gap-4">
        <Todo v-for="todo in folderTodos" :todo="todo" :key="todo.id" />
      </ul>
      <button class="btn-black w-full mt-12" @click="handleLogout">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watchEffect } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { handleLogout } from "../helpers/use-auth";
import { Folder } from "../types/folders";
import { getTodosByFolderId, allTodos } from "../helpers/use-tasks";
import { Todo as TTodo } from "../types/todo";

import Todo from "../components/Todo.vue";

const selectedFolder = ref<Folder>();
const setSelectedFolder = (folder: Folder) => (selectedFolder.value = folder);
const folderTodos = ref<TTodo[]>([]);
provide("selectedFolder", {
  selectedFolder,
  setSelectedFolder,
});

watchEffect(async () => {
  if (selectedFolder.value) {
    await getTodosByFolderId(selectedFolder.value.id);
    folderTodos.value = allTodos.value;
  }
});
</script>

