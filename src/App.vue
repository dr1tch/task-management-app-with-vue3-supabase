<script setup lang="ts">
// import { userSession } from "./helpers/use-auth";
// import Login from "./pages/Login.vue";
// import Register from "./pages/Register.vue";
// import Tasks from "./pages/Tasks.vue";
</script>

<template>
  <div class="w-full h-full min-h-screen text-white">
    <router-view />
    <!-- <div
      v-if="userSession.session === null"
      class="w-full min-h-screen flex flex-col justify-center items-center p-4"
    >
      <Login />
    </div>
    <div v-else class="w-full min-h-screen">
      <Suspense>
        <template #default>
          <div class="min-h-screen h-full">
            <Tasks />
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

