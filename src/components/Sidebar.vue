<template>
  <div class="w-1/3 py-10 border-r min-h-screen">
    <ul>
      <li
        v-for="folder in folders"
        :key="folder.id"
        class="mx-10 px-6 py-4 hover:bg-emerald-600/50 rounded-lg border border-emerald-600 cursor-pointer"
        @click="setSelectedFolder(folder)"
      >
        {{ folder.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref, inject, onMounted, ref } from "vue";
import { allFolders, getAllFolder } from "../helpers/use-folders";
import { Folder } from "../types/folders";

const folders = ref<Folder[]>([]);
const { setSelectedFolder } = inject("selectedFolder") as {
  selectedFolder: Ref<Folder | undefined>;
  setSelectedFolder: (folder: Folder) => Folder;
};
onMounted(async () => {
  const getFolders = async () => await getAllFolder();
  await getFolders();
  folders.value = allFolders.value;
});
</script>

