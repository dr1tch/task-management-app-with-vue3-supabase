<template>
  <div class="flex justify-start items-start gap-4">
    <input
      type="checkbox"
      class="accent-emerald-700"
      :checked="props.todo.is_complete || false"
      @change="(e) => handleComplete(e)"
    />
    <div>
      <h1 class="text-2xl font-bold -mt-2">{{ props.todo.title }}</h1>
      <p class="text-sm">
        {{ props.todo.task }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateTaskCompletion } from "../helpers/use-tasks";
import { Todo } from "../types/todo";

const props = defineProps<{ todo: Todo }>();

const handleComplete = (isChecked: boolean) => {
  updateTaskCompletion(props.todo, isChecked);
};
</script>

