<template>
  <div
    class="w-1/3 py-10 border-r flex flex-col justify-between border-r-emerald-600 min-h-screen"
  >
    <ul>
      <li
        v-for="folder in folders"
        :key="folder.id"
        class="mx-10 px-6 py-4 bg-emerald-950 hover:bg-emerald-700 rounded-lg cursor-pointer text-base shadow-white/5 font-medium"
        @click="setSelectedFolder(folder)"
      >
        {{ folder.title }}
      </li>
    </ul>
    <button
      @click="handleLogout"
      class="rounded-md bg-emerald-600 mx-10 px-4 py-2.5 w-auto text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ref, inject, onMounted, ref } from "vue";
import { allFolders, getAllFolder } from "../helpers/use-folders";
import { Folder } from "../types/folders";
import { handleLogout } from "../helpers/use-auth";

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

