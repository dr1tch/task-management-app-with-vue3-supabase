<template>
  <div
    class="flex min-h-screen h-full flex-col justify-center align-middle w-full px-6 py-12 lg:px-8"
  >
    <div class="m-y-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" src="/vite.svg" alt="Your Company" />
        <h2
          class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight"
        >
          Sign in to your account
        </h2>
      </div>
      <div
        class="bg-emerald-700/30 sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-start gap-4 px-4 py-4 rounded-md mt-10"
        v-if="Boolean(isUserRegistered) === true"
      >
        <CheckCircle />
        <p>You registered successfully. Login to your account</p>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-base font-medium leading-6"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                :id="email"
                :name="email"
                type="email"
                aria-label="email"
                aria-placeholder="Please enter your email"
                autocomplete="email"
                placeholder="john.doe@example.com"
                required
                :class="[
                  'block w-full rounded-md border-[1.67px] py-3 px-4 outline-none shadow-sm border-emerald-600 bg-black-background placeholder:text-gray-600 sm:text-base sm:leading-6 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-emerald-600',
                  {
                    'border-red-500 focus:border-red-500':
                      emailError.length > 0,
                  },
                ]"
              />
              <div v-if="emailError.length > 0">
                <span class="text-red-500 text-sm mt-1">{{ emailError }}</span>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-base font-medium leading-6"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="***************"
                required
                :class="[
                  'block w-full rounded-md border-[1.67px] py-3 px-4 outline-none shadow-sm border-emerald-600 bg-black-background placeholder:text-gray-600 sm:text-base sm:leading-6 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-emerald-600',
                  {
                    'border-red-500 focus:border-red-500':
                      passwordError.length > 0,
                  },
                ]"
              />
              <div v-if="passwordError.length > 0">
                <span class="text-red-500 text-sm mt-1">{{
                  passwordError
                }}</span>
              </div>
            </div>
          </div>

          <div>
            <button
              @click.prevent="onSubmit"
              type="submit"
              class="flex w-full justify-center rounded-md bg-emerald-700 px-4 py-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-emerald-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-base text-gray-200">
          Not a member?
          <a
            href="/register"
            class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >Register</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { handleLogin } from "../helpers/use-auth";
// ignore-eslint-next-line
import { CheckCircle } from "lucide-vue-next";
import router from "../routes";
const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const serverError = ref("");

const params = new URLSearchParams(document.location.search);
const isUserRegistered = params.get("isUserRegistered");

// Watchers
watch(email, () => {
  if (email.value.length > 0) {
    emailError.value = "";
  }
});
watch(password, () => {
  if (password.value.length > 0) {
    passwordError.value = "";
  }
});

const onSubmit = async () => {
  if (email.value.length === 0 && password.value.length === 0) {
    emailError.value = "Email is required!";
    passwordError.value = "Password is required!";
    return;
  } else {
    if (email.value.length === 0) {
      emailError.value = "Email is required!";
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
      emailError.value = "Invalid email address";
      return;
    }
    if (password.value.length === 0) {
      passwordError.value = "Password is required!";
      return;
    }
  }

  const { errors, isSuccess } = await handleLogin({
    email: email.value,
    password: password.value,
  });
  serverError.value = errors?.message || "";
  if (isSuccess) {
    router.push({
      path: "/",
    });
  }
};
</script>

